import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import Imap from "node-imap";
import logger from "../utils/logService.js";

// Email configuration class
class EmailService {
  constructor() {
    this.transporter = null;
    this.imap = null;
    this.isConfigured = false;
    this.initTransporter();
    this.initImap();
  }

  // Initialize the email transporter
  initTransporter() {
    try {
      // Validate required environment variables
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        logger.warn(
          "Gmail configuration missing. Email service will not work."
        );
        return;
      }

      this.transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        // Additional security settings
        secure: true, // Use SSL/TLS
        port: 465,
        tls: {
          rejectUnauthorized: false,
        },
      });

      this.isConfigured = true;
      logger.info("Email service configured successfully");
    } catch (error) {
      logger.error("Failed to configure email service:", error);
      this.isConfigured = false;
    }
  }

  // Initialize IMAP connection for fetching emails
  initImap() {
    try {
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        logger.warn("Gmail configuration missing. IMAP service will not work.");
        return;
      }

      // Don't create connection here, create it per operation
      this.imapConfig = {
        user: process.env.GMAIL_USER,
        password: process.env.GMAIL_APP_PASSWORD,
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        connTimeout: 60000,
        authTimeout: 5000,
      };

      logger.info("IMAP service configured successfully");
    } catch (error) {
      logger.error("Failed to configure IMAP service:", error);
    }
  }

  // Create a new IMAP connection
  createImapConnection() {
    if (!this.imapConfig) {
      throw new Error("IMAP service not configured");
    }
    return new Imap(this.imapConfig);
  }

  // Verify IMAP connection
  async verifyImapConnection() {
    if (!this.imapConfig) {
      throw new Error("IMAP service not configured");
    }

    const imap = this.createImapConnection();

    return new Promise((resolve, reject) => {
      imap.once("ready", () => {
        logger.info("IMAP connection verified successfully");
        imap.end();
        resolve(true);
      });

      imap.once("error", (err) => {
        logger.error("IMAP connection verification failed:", err);
        reject(err);
      });

      imap.connect();
    });
  }

  // Verify email configuration (SMTP)
  async verifyConnection() {
    if (!this.isConfigured) {
      throw new Error("Email service not configured");
    }

    try {
      await this.transporter.verify();
      logger.info("Email connection verified successfully");
      return true;
    } catch (error) {
      logger.error("Email connection verification failed:", error);
      return false;
    }
  }

  // Fetch emails from inbox
  async fetchInboxEmails(options = {}) {
    const {
      limit = 50,
      offset = 0,
      search = "",
      from = "",
      to = "",
      subject = "",
      dateFrom = "",
      dateTo = "",
      unreadOnly = false,
    } = options;

    if (!this.imapConfig) {
      throw new Error("IMAP service not configured");
    }

    return new Promise((resolve, reject) => {
      const emails = [];
      let processedCount = 0;

      const imap = this.createImapConnection();

      imap.once("ready", () => {
        imap.openBox("INBOX", false, (err, box) => {
          if (err) {
            reject(err);
            return;
          }

          // Build search criteria
          let searchCriteria = [];

          if (unreadOnly) {
            searchCriteria.push("UNSEEN");
          }

          if (search) {
            // Nested OR: FROM or (TO or (SUBJECT or BODY))
            searchCriteria.push([
              "OR",
              ["FROM", search],
              [
                "OR",
                ["TO", search],
                ["OR", ["SUBJECT", search], ["BODY", search]],
              ],
            ]);
          }

          if (from) {
            searchCriteria.push(["FROM", from]);
          }

          if (to) {
            searchCriteria.push(["TO", to]);
          }

          if (subject) {
            searchCriteria.push(["SUBJECT", subject]);
          }

          if (dateFrom || dateTo) {
            if (dateFrom) {
              searchCriteria.push(["SINCE", new Date(dateFrom)]);
            }
            if (dateTo) {
              searchCriteria.push(["BEFORE", new Date(dateTo)]);
            }
          }

          // If no search criteria, get all emails
          const finalCriteria =
            searchCriteria.length > 0 ? searchCriteria : ["ALL"];

          imap.search(finalCriteria, (err, results) => {
            if (err) {
              reject(err);
              return;
            }

            if (results.length === 0) {
              imap.end();
              resolve({
                emails: [],
                total: 0,
                pagination: {
                  currentPage: Math.floor(offset / limit) + 1,
                  totalPages: 0,
                  totalItems: 0,
                  itemsPerPage: limit,
                },
              });
              return;
            }

            // Apply pagination
            const startIndex = offset;
            const endIndex = Math.min(startIndex + limit, results.length);
            const paginatedResults = results.slice(startIndex, endIndex);

            const fetch = imap.fetch(paginatedResults, {
              bodies: "",
              struct: true,
            });

            fetch.on("message", (msg, seqno) => {
              const email = {
                uid: seqno,
                from: "",
                to: "",
                subject: "",
                date: "",
                text: "",
                html: "",
                attachments: [],
                flags: [],
                size: 0,
              };

              msg.on("body", (stream, info) => {
                let buffer = "";
                stream.on("data", (chunk) => {
                  buffer += chunk.toString("utf8");
                });
                stream.on("end", () => {
                  // Parse email headers
                  const lines = buffer.split("\r\n");
                  let headerEndIndex = 0;

                  for (let i = 0; i < lines.length; i++) {
                    if (lines[i] === "") {
                      headerEndIndex = i;
                      break;
                    }
                  }

                  // Parse headers
                  const headers = lines.slice(0, headerEndIndex);
                  headers.forEach((header) => {
                    if (header.startsWith("From: ")) {
                      email.from = header.substring(6);
                    } else if (header.startsWith("To: ")) {
                      email.to = header.substring(4);
                    } else if (header.startsWith("Subject: ")) {
                      email.subject = header.substring(9);
                    } else if (header.startsWith("Date: ")) {
                      email.date = header.substring(6);
                    }
                  });

                  // Get body content
                  const body = lines.slice(headerEndIndex + 1).join("\r\n");
                  email.text = body;
                  email.html = body; // For simplicity, using same content
                });
              });

              msg.once("attributes", (attrs) => {
                email.flags = attrs.flags || [];
                email.size = attrs.size || 0;
              });

              msg.once("end", () => {
                emails.push(email);
                processedCount++;

                if (processedCount === paginatedResults.length) {
                  imap.end();
                  resolve({
                    emails: emails.sort(
                      (a, b) => new Date(b.date) - new Date(a.date)
                    ),
                    total: results.length,
                    pagination: {
                      currentPage: Math.floor(offset / limit) + 1,
                      totalPages: Math.ceil(results.length / limit),
                      totalItems: results.length,
                      itemsPerPage: limit,
                    },
                  });
                }
              });
            });

            fetch.once("error", (err) => {
              reject(err);
            });
          });
        });
      });

      imap.once("error", (err) => {
        reject(err);
      });

      imap.connect();
    });
  }

  // Get email by UID
  async getEmailByUid(uid) {
    if (!this.imapConfig) {
      throw new Error("IMAP service not configured");
    }

    return new Promise((resolve, reject) => {
      const imap = this.createImapConnection();

      imap.once("ready", () => {
        imap.openBox("INBOX", false, (err, box) => {
          if (err) {
            reject(err);
            return;
          }

          const fetch = imap.fetch(uid, {
            bodies: "",
            struct: true,
          });

          fetch.on("message", (msg, seqno) => {
            const email = {
              uid: uid,
              from: "",
              to: "",
              subject: "",
              date: "",
              text: "",
              html: "",
              attachments: [],
              flags: [],
              size: 0,
            };

            msg.on("body", (stream, info) => {
              let buffer = "";
              stream.on("data", (chunk) => {
                buffer += chunk.toString("utf8");
              });
              stream.on("end", () => {
                // Parse email headers
                const lines = buffer.split("\r\n");
                let headerEndIndex = 0;

                for (let i = 0; i < lines.length; i++) {
                  if (lines[i] === "") {
                    headerEndIndex = i;
                    break;
                  }
                }

                // Parse headers
                const headers = lines.slice(0, headerEndIndex);
                headers.forEach((header) => {
                  if (header.startsWith("From: ")) {
                    email.from = header.substring(6);
                  } else if (header.startsWith("To: ")) {
                    email.to = header.substring(4);
                  } else if (header.startsWith("Subject: ")) {
                    email.subject = header.substring(9);
                  } else if (header.startsWith("Date: ")) {
                    email.date = header.substring(6);
                  }
                });

                // Get body content
                const body = lines.slice(headerEndIndex + 1).join("\r\n");
                email.text = body;
                email.html = body;
              });
            });

            msg.once("attributes", (attrs) => {
              email.flags = attrs.flags || [];
              email.size = attrs.size || 0;
            });

            msg.once("end", () => {
              imap.end();
              resolve(email);
            });
          });

          fetch.once("error", (err) => {
            reject(err);
          });
        });
      });

      imap.once("error", (err) => {
        reject(err);
      });

      imap.connect();
    });
  }

  // Mark email as read/unread
  async markEmailAsRead(uid, read = true) {
    if (!this.imapConfig) {
      throw new Error("IMAP service not configured");
    }

    return new Promise((resolve, reject) => {
      const imap = this.createImapConnection();

      imap.once("ready", () => {
        imap.openBox("INBOX", false, (err, box) => {
          if (err) {
            reject(err);
            return;
          }

          const flag = read ? "\\Seen" : "\\Unseen";
          imap.setFlags(uid, [flag], (err) => {
            if (err) {
              reject(err);
            } else {
              imap.end();
              resolve({
                success: true,
                message: `Email marked as ${read ? "read" : "unread"}`,
              });
            }
          });
        });
      });

      imap.once("error", (err) => {
        reject(err);
      });

      imap.connect();
    });
  }

  // Delete email
  async deleteEmail(uid) {
    if (!this.imapConfig) {
      throw new Error("IMAP service not configured");
    }

    return new Promise((resolve, reject) => {
      const imap = this.createImapConnection();

      imap.once("ready", () => {
        imap.openBox("INBOX", false, (err, box) => {
          if (err) {
            reject(err);
            return;
          }

          imap.setFlags(uid, ["\\Deleted"], (err) => {
            if (err) {
              reject(err);
            } else {
              imap.end();
              resolve({ success: true, message: "Email marked for deletion" });
            }
          });
        });
      });

      imap.once("error", (err) => {
        reject(err);
      });

      imap.connect();
    });
  }

  // Send email with comprehensive error handling
  async sendEmail(options) {
    const {
      to,
      subject,
      html,
      text,
      attachments = [],
      cc = [],
      bcc = [],
      replyTo = null,
    } = options;

    if (!this.isConfigured) {
      throw new Error(
        "Email service not configured. Please check GMAIL_USER and GMAIL_APP_PASSWORD environment variables."
      );
    }

    try {
      const mailOptions = {
        from: `"${
          process.env.EMAIL_FROM_NAME || "Insurance Management System"
        }" <${process.env.GMAIL_USER}>`,
        to: Array.isArray(to) ? to.join(", ") : to,
        subject: subject,
        html: html,
        text: text,
        attachments: attachments,
        cc: cc.length > 0 ? cc.join(", ") : undefined,
        bcc: bcc.length > 0 ? bcc.join(", ") : undefined,
        replyTo: replyTo,
      };

      const info = await this.transporter.sendMail(mailOptions);

      logger.info(`Email sent successfully to ${to}`, {
        messageId: info.messageId,
        subject: subject,
      });

      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
      };
    } catch (error) {
      logger.error("Failed to send email:", {
        error: error.message,
        to: to,
        subject: subject,
      });

      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email, resetCode, userName = "User") {
    const subject = "Password Reset Request - Insurance Management System";
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Password Reset</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; }
            .code { background: #e74c3c; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
            .footer { background: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
            .warning { background: #f39c12; color: white; padding: 10px; margin: 20px 0; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Insurance Management System</h1>
              <h2>Password Reset Request</h2>
            </div>
            
            <div class="content">
              <p>Hello ${userName},</p>
              
              <p>We received a request to reset your password for your Insurance Management System account.</p>
              
              <p>Your password reset code is:</p>
              
              <div class="code">${resetCode}</div>
              
              <div class="warning">
                <strong>Important:</strong> This code will expire in 10 minutes for security reasons.
              </div>
              
              <p>If you didn't request this password reset, please ignore this email or contact our support team immediately.</p>
              
              <p>For security reasons, never share this code with anyone.</p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from the Insurance Management System.</p>
              <p>If you have any questions, please contact our support team.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: subject,
      html: html,
    });
  }

  // Send welcome email
  async sendWelcomeEmail(email, userName) {
    const subject = "Welcome to Insurance Management System";
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Welcome</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #27ae60; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; }
            .footer { background: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Insurance Management System</h1>
              <h2>Welcome!</h2>
            </div>
            
            <div class="content">
              <p>Hello ${userName},</p>
              
              <p>Welcome to the Insurance Management System! Your account has been successfully created.</p>
              
              <p>You can now:</p>
              <ul>
                <li>Access your dashboard</li>
                <li>Manage your insurance policies</li>
                <li>View and pay invoices</li>
                <li>Update your profile information</li>
              </ul>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
              
              <p>Thank you for choosing our Insurance Management System!</p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from the Insurance Management System.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: subject,
      html: html,
    });
  }

  // Send invoice notification
  async sendInvoiceNotification(email, invoiceData, customerName) {
    const subject = `Invoice #${invoiceData.invoiceNumber} - Insurance Management System`;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Invoice Notification</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3498db; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; }
            .invoice-details { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #3498db; }
            .amount { font-size: 24px; font-weight: bold; color: #e74c3c; }
            .footer { background: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Insurance Management System</h1>
              <h2>Invoice Notification</h2>
            </div>
            
            <div class="content">
              <p>Hello ${customerName},</p>
              
              <p>A new invoice has been generated for your insurance policy.</p>
              
              <div class="invoice-details">
                <h3>Invoice Details:</h3>
                <p><strong>Invoice Number:</strong> ${
                  invoiceData.invoiceNumber
                }</p>
                <p><strong>Description:</strong> ${invoiceData.description}</p>
                <p><strong>Due Date:</strong> ${new Date(
                  invoiceData.dueDate
                ).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${invoiceData.status}</p>
                <p class="amount"><strong>Amount:</strong> $${invoiceData.totalAmount.toFixed(
                  2
                )}</p>
              </div>
              
              <p>Please log in to your account to view the complete invoice and make payment.</p>
              
              <p>If you have any questions about this invoice, please contact our support team.</p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from the Insurance Management System.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: subject,
      html: html,
    });
  }

  // Send payment confirmation
  async sendPaymentConfirmation(email, paymentData, customerName) {
    const subject = `Payment Confirmation - Invoice #${paymentData.invoiceNumber}`;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Payment Confirmation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #27ae60; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; }
            .payment-details { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #27ae60; }
            .amount { font-size: 24px; font-weight: bold; color: #27ae60; }
            .footer { background: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Insurance Management System</h1>
              <h2>Payment Confirmation</h2>
            </div>
            
            <div class="content">
              <p>Hello ${customerName},</p>
              
              <p>Thank you for your payment! Your payment has been successfully processed.</p>
              
              <div class="payment-details">
                <h3>Payment Details:</h3>
                <p><strong>Invoice Number:</strong> ${
                  paymentData.invoiceNumber
                }</p>
                <p><strong>Payment Method:</strong> ${
                  paymentData.paymentMethod
                }</p>
                <p><strong>Transaction ID:</strong> ${
                  paymentData.transactionId
                }</p>
                <p><strong>Payment Date:</strong> ${new Date(
                  paymentData.paymentDate
                ).toLocaleDateString()}</p>
                <p class="amount"><strong>Amount Paid:</strong> $${paymentData.amount.toFixed(
                  2
                )}</p>
              </div>
              
              <p>A receipt has been generated and is available in your account.</p>
              
              <p>Thank you for choosing our Insurance Management System!</p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from the Insurance Management System.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: subject,
      html: html,
    });
  }
}

// Create singleton instance
const emailService = new EmailService();

// Export the service and individual functions for backward compatibility
export default emailService;

// Backward compatibility function
export async function sendEmail(dest, subject, message) {
  return emailService.sendEmail({
    to: dest,
    subject: subject,
    html: message,
  });
}

// Export specific email functions
export const sendPasswordResetEmail = (email, resetCode, userName) =>
  emailService.sendPasswordResetEmail(email, resetCode, userName);

export const sendWelcomeEmail = (email, userName) =>
  emailService.sendWelcomeEmail(email, userName);

export const sendInvoiceNotification = (email, invoiceData, customerName) =>
  emailService.sendInvoiceNotification(email, invoiceData, customerName);

export const sendPaymentConfirmation = (email, paymentData, customerName) =>
  emailService.sendPaymentConfirmation(email, paymentData, customerName);

export const verifyEmailConnection = () => emailService.verifyConnection();

export const verifyImapConnection = () => emailService.verifyImapConnection();

export const fetchInboxEmails = (options) =>
  emailService.fetchInboxEmails(options);

export const getEmailByUid = (uid) => emailService.getEmailByUid(uid);

export const markEmailAsRead = (uid, read) =>
  emailService.markEmailAsRead(uid, read);

export const deleteEmail = (uid) => emailService.deleteEmail(uid);
