import UserModel from "../../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import {
  sendPasswordResetEmail,
  verifyImapConnection,
  fetchInboxEmails,
  getEmailByUid,
  markEmailAsRead,
  deleteEmail,
} from "../../../Servicess/email.js";
import {
  sendSingleSMS as sendSingleSMSService,
  sendBulkSMS as sendBulkSMSService,
  testSMSConfiguration as testSMSConfigurationService,
  getSMSServiceStatus,
} from "../../../Servicess/sms.js";
import DepartmentModel from "../../../../DB/models/Department.model.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";

// Ensure User model is properly registered
const User = UserModel;

const logAudit = async ({
  userId,
  action,
  entity,
  entityId,
  userName,
  oldValue = null,
  newValue = null,
}) => {
  try {
    await AuditLogModel.create({
      user: userId,
      action,
      entity,
      entityId,
      oldValue,
      newValue,
      userName,
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
};

export const profile = async (req, res) => {
  console.log(req.user);
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.json({ message: "user not found" });
  }

  res.json({ message: "success", user });
};

export const changeInformation = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    if (email) {
      const existEmail = await UserModel.findOne({ email: email });
      if (existEmail && existEmail._id.toString() !== userId) {
        return res.status(400).json({ message: "Email was already using" });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    await user.save();

    res.json({
      message: "update success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const changepassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      res
        .status(400)
        .json({ message: "please ensure that your password is correct" });
    }
    const hash = bcrypt.hashSync(newPassword, parseInt(process.env.saltRound));
    res.status(200).json({ message: "success", user });
    user.password = hash;
    await user.save();
    res.json({ message: "change password successfully" });
  } catch (err) {
    console.log(err);
  }
};
export const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "Name, email, and password are required" 
      });
    }

    // Check if user already exists
    const finduser = await UserModel.findOne({ email: email });

    if (finduser) {
      return res.status(400).json({ message: "user already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.saltRound)
    );

    // Create admin user
    const adminUser = new UserModel({
      name,
      email,
      role: "admin",
      password: hashedPassword,
      status: "active",
    });

    await adminUser.save();
    res.status(201).json({ 
      message: "Admin user created successfully", 
      user: {
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        status: adminUser.status
      }
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "please ensure that your password is correct" });
      } else {
        const token = jwt.sign(
          { id: user._id, email, name: user.name, role: user.role },
          process.env.TokenSignIn,
          { expiresIn: 60 * 60 * 24 }
        );
        res.status(200).json({ message: "success", token, user });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const forgetPassward = async (req, res, next) => {
  const { code, email, newPassword } = req.body;
  try {
    if (code == null) {
      return res.status(400).json({ message: "Please enter the reset code" });
    } else {
      const hash = bcrypt.hashSync(
        newPassword,
        parseInt(process.env.saltRound)
      );
      const user = await UserModel.findOneAndUpdate(
        { email: email, sendCode: code },
        { password: hash, sendCode: null }
      );
      if (!user) {
        return res.status(400).json({ message: "Please verify the code" });
      }
      return res.status(200).json({ message: "sucsses", user });
    }
  } catch (error) {
    next(error);
  }
};

export const sendCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const findUser = await UserModel.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({ message: "Please log in" });
    }

    const code = nanoid();

    const user = await UserModel.findOneAndUpdate(
      { _id: findUser.id },
      { sendCode: code },
      { new: true }
    );

    if (!user) {
      return res.status(500).json({ message: "Failed to send code" });
    }

    await sendPasswordResetEmail(email, code, findUser.name);

    return res.status(200).json({ message: "Code sent successfully ", user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const addHeadOfDepartmentToDepartment = async (req, res, next) => {
  const { name, email, phone, password, status } = req.body;
  const { id } = req.params;

  try {
    const findDep = await DepartmentModel.findById(id);
    if (!findDep) {
      return res.status(404).json({ message: "This department doesn't exist" });
    }

    if (findDep.headOfDepartment) {
      return res.status(400).json({
        message: "There is already a head of department for this department",
      });
    }

    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.saltRound)
    );
    const findEmail = await UserModel.findOne({ email: email });
    if (findEmail) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new UserModel({
        name,
        email,
        phone,
        role: "headOfDepartment",
        password: hashPassword,
        departmentId: findDep._id,
        status: status || "active",
      });

      await newUser.save();

      findDep.headOfDepartment = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        status: newUser.status,
      };

      await findDep.save();

      return res.status(201).json({
        message: "Head of department added successfully",
        department: findDep,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const deleteHeadOfDepartmentFromDepartment = async (req, res, next) => {
  const { depId, userId } = req.params;

  try {
    const department = await DepartmentModel.findById(depId);

    if (!department) {
      return res.status(404).json({ message: "This department doesn't exist" });
    }

    if (!department.headOfDepartment || !department.headOfDepartment._id) {
      return res
        .status(400)
        .json({ message: "This department has no head of department" });
    }

    if (department.headOfDepartment._id.toString() !== userId.toString()) {
      return res
        .status(400)
        .json({ message: "This user is not the head of the department" });
    }

    department.headOfDepartment = null;
    await department.save();

    const user = await UserModel.findById(userId);
    if (user) {
      await UserModel.findByIdAndDelete(userId);
    }

    return res
      .status(200)
      .json({ message: "Head of department removed successfully", department });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getHeadOfDepartment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findDep = await DepartmentModel.findById(id);
    if (!findDep) {
      return res.status(404).json({ message: "This department doesn't exist" });
    } else {
      const findHead = await findDep.headOfDepartment;
      res
        .status(200)
        .json({ message: "Head of department retrieved", findHead });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const addEmployee = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, password, status } = req.body;

  try {
    const findDep = await DepartmentModel.findById(id);
    if (!findDep) {
      return res.status(404).json({ message: "Department not found" });
    }

    const findEmail = await UserModel.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.saltRound)
    );

    const newUser = new UserModel({
      name,
      email,
      phone,
      role: "employee",
      password: hashPassword,
      departmentId: id,
      status: status || "active",
    });

    await newUser.save();

    findDep.employees.push({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: newUser.status,
    });

    await findDep.save();

    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      action: `Add employee by ${findUser.name}`,
      userName: findUser.name,
      entity: "Employee",
      entityId: newUser._id,
      oldValue: null,
      newValue: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        departmentId: newUser.departmentId,
        status: newUser.status,
      },
    });

    return res.status(201).json({
      message: "Employee added successfully",
      department: findDep,
      employee: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  const { depId, employeeId } = req.params;

  try {
    const findDep = await DepartmentModel.findById(depId);
    if (!findDep) {
      return res.status(404).json({ message: "This department doesn't exist" });
    }

    const employeeIndex = findDep.employees.findIndex(
      (emp) => emp._id.toString() === employeeId
    );
    if (employeeIndex === -1) {
      return res
        .status(404)
        .json({ message: "Employee not found in this department" });
    }

    const employeeData = findDep.employees[employeeIndex];

    findDep.employees.splice(employeeIndex, 1);
    await findDep.save();

    await UserModel.findByIdAndDelete(employeeId);

    await logAudit({
      userId: req.user._id,
      action: "Delete",
      entity: "Employee",
      entityId: employeeId,
      oldValue: employeeData,
      newValue: null,
    });

    return res.status(200).json({
      message: "Employee successfully deleted from the department",
      department: findDep,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const allEmployee = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    const findDepartment = await DepartmentModel.findById(departmentId);
    if (!findDepartment) {
      return res.status(200).json({
        success: true,
        message: "Department not found",
        data: [],
      });
    }
    const employees = await UserModel.find({ departmentId: departmentId });
    return res.status(200).json({
      success: true,
      message: "All employees",
      data: employees || [],
    });
  } catch (error) {
    next(error);
  }
};

// Update employee data
export const updateEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  const { name, email, phone, status } = req.body;

  try {
    const employee = await UserModel.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if employee belongs to the same department as the requesting user
    if (
      req.user.role !== "admin" &&
      req.user.departmentId?.toString() !== employee.departmentId?.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You can only update employees in your department" });
    }

    const oldValue = employee.toObject();

    // Update fields if provided
    if (name !== undefined) employee.name = name;
    if (email !== undefined) {
      // Check if email is already taken by another user
      const existingUser = await UserModel.findOne({
        email,
        _id: { $ne: employeeId },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email is already taken by another user" });
      }
      employee.email = email;
    }
    if (phone !== undefined) employee.phone = phone;
    if (status !== undefined) employee.status = status;

    await employee.save();

    // Update employee in department if department exists
    if (employee.departmentId) {
      const department = await DepartmentModel.findById(employee.departmentId);
      if (department) {
        const employeeIndex = department.employees.findIndex(
          (emp) => emp._id.toString() === employeeId
        );
        if (employeeIndex !== -1) {
          department.employees[employeeIndex] = {
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            role: employee.role,
            status: employee.status,
          };
          await department.save();
        }
      }
    }

    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      action: `Update employee by ${findUser.name}`,
      userName: findUser.name,
      entity: "Employee",
      entityId: employee._id,
      oldValue,
      newValue: employee.toObject(),
    });

    return res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// Reset employee password (admin only)
export const resetEmployeePassword = async (req, res, next) => {
  const { employeeId } = req.params;
  const { newPassword } = req.body;

  try {
    const employee = await UserModel.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.role === "admin") {
      return res
        .status(403)
        .json({ message: "Cannot reset admin password through this endpoint" });
    }

    const oldValue = { password: "***HIDDEN***" };

    // Hash the new password
    const hashPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.saltRound)
    );

    employee.password = hashPassword;
    await employee.save();

    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      action: `Reset employee password by ${findUser.name}`,
      userName: findUser.name,
      entity: "Employee",
      entityId: employee._id,
      oldValue,
      newValue: { password: "***HIDDEN***" },
    });

    return res.status(200).json({
      message: "Employee password reset successfully",
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        status: employee.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Toggle employee status (activate/deactivate)
export const toggleEmployeeStatus = async (req, res, next) => {
  const { employeeId } = req.params;
  const { status } = req.body;

  try {
    const employee = await UserModel.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if employee belongs to the same department as the requesting user
    if (
      req.user.role !== "admin" &&
      req.user.departmentId?.toString() !== employee.departmentId?.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You can only update employees in your department" });
    }

    if (employee.role === "admin") {
      return res
        .status(403)
        .json({ message: "Cannot change admin status through this endpoint" });
    }

    const oldValue = { status: employee.status };

    employee.status = status;
    await employee.save();

    // Update employee status in department if department exists
    if (employee.departmentId) {
      const department = await DepartmentModel.findById(employee.departmentId);
      if (department) {
        const employeeIndex = department.employees.findIndex(
          (emp) => emp._id.toString() === employeeId
        );
        if (employeeIndex !== -1) {
          department.employees[employeeIndex].status = status;
          await department.save();
        }
      }
    }

    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      action: `Toggle employee status by ${findUser.name}`,
      userName: findUser.name,
      entity: "Employee",
      entityId: employee._id,
      oldValue,
      newValue: { status: employee.status },
    });

    return res.status(200).json({
      message: `Employee ${
        status === "active" ? "activated" : "deactivated"
      } successfully`,
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        status: employee.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Test email configuration endpoint
export const testEmailConfiguration = async (req, res, next) => {
  try {
    const { verifyEmailConnection } = await import(
      "../../../Servicess/email.js"
    );

    // Test email connection
    const isConnected = await verifyEmailConnection();

    if (!isConnected) {
      return res.status(500).json({
        message: "Email service not configured properly",
        error:
          "Please check GMAIL_USER and GMAIL_APP_PASSWORD environment variables",
      });
    }

    // Test sending a simple email
    const emailService = (await import("../../../Servicess/email.js")).default;

    const testResult = await emailService.sendEmail({
      to: req.body.testEmail || "islam.mutawea@gmail.com",
      subject: "Email Configuration Test",
      html: `
        <h1>Email Configuration Test</h1>
        <p>This is a test email to verify that the Gmail configuration is working properly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Status:</strong> ✅ Email service is working correctly!</p>
      `,
    });

    return res.status(200).json({
      message: "Email configuration test successful",
      connection: "Connected",
      testEmail: testResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Email configuration test failed:", error);
    return res.status(500).json({
      message: "Email configuration test failed",
      error: error.message,
      details:
        "Please check the EMAIL_CONFIGURATION.md file for setup instructions",
    });
  }
};

// Send custom email with content from frontend
export const sendCustomEmail = async (req, res, next) => {
  try {
    const {
      to,
      subject,
      html,
      text,
      cc = [],
      bcc = [],
      attachments = [],
      replyTo = null,
    } = req.body;

    // Validate required fields
    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["to", "subject", "html or text"],
        received: {
          to: !!to,
          subject: !!subject,
          html: !!html,
          text: !!text,
        },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        message: "Invalid email address format",
        email: to,
      });
    }

    // Validate CC and BCC emails if provided
    const validateEmails = (emails) => {
      if (!Array.isArray(emails)) return false;
      return emails.every((email) => emailRegex.test(email));
    };

    if (cc.length > 0 && !validateEmails(cc)) {
      return res.status(400).json({
        message: "Invalid CC email address format",
        cc: cc,
      });
    }

    if (bcc.length > 0 && !validateEmails(bcc)) {
      return res.status(400).json({
        message: "Invalid BCC email address format",
        bcc: bcc,
      });
    }

    // Import email service
    const emailService = (await import("../../../Servicess/email.js")).default;

    // Send email
    const result = await emailService.sendEmail({
      to,
      subject,
      html,
      text,
      cc,
      bcc,
      attachments,
      replyTo,
    });

    // Log audit
    await logAudit({
      userId: req.user._id,
      action: `Send Custom Email`,
      userName: req.user.name || "Unknown User",
      entity: "Email",
      entityId: result.messageId,
      oldValue: null,
      newValue: {
        to,
        subject,
        messageId: result.messageId,
        timestamp: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      message: "Email sent successfully",
      emailId: result.messageId,
      timestamp: new Date().toISOString(),
      details: {
        to,
        subject,
        cc: cc.length > 0 ? cc : undefined,
        bcc: bcc.length > 0 ? bcc : undefined,
        attachments: attachments.length > 0 ? attachments.length : 0,
      },
    });
  } catch (error) {
    console.error("Failed to send custom email:", error);
    return res.status(500).json({
      message: "Failed to send email",
      error: error.message,
    });
  }
};

// Send bulk emails
export const sendBulkEmails = async (req, res, next) => {
  try {
    const {
      emails,
      subject,
      html,
      text,
      cc = [],
      bcc = [],
      attachments = [],
    } = req.body;

    // Validate required fields
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({
        message: "Emails array is required and must not be empty",
      });
    }

    if (!subject || (!html && !text)) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["subject", "html or text"],
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((email) => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
      return res.status(400).json({
        message: "Invalid email addresses found",
        invalidEmails,
      });
    }

    // Import email service
    const emailService = (await import("../../../Servicess/email.js")).default;

    // Send emails with delay to avoid rate limiting
    const results = [];
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < emails.length; i++) {
      try {
        const result = await emailService.sendEmail({
          to: emails[i],
          subject,
          html,
          text,
          cc,
          bcc,
          attachments,
        });

        results.push({
          email: emails[i],
          success: true,
          messageId: result.messageId,
        });

        // Add delay between emails to avoid rate limiting
        if (i < emails.length - 1) {
          await delay(1000); // 1 second delay
        }
      } catch (error) {
        results.push({
          email: emails[i],
          success: false,
          error: error.message,
        });
      }
    }

    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    // Log audit
    await logAudit({
      userId: req.user._id,
      action: `Send Bulk Emails`,
      userName: req.user.name || "Unknown User",
      entity: "Email",
      entityId: `bulk_${Date.now()}`,
      oldValue: null,
      newValue: {
        totalEmails: emails.length,
        successful,
        failed,
        subject,
        timestamp: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      message: "Bulk email operation completed",
      summary: {
        total: emails.length,
        successful,
        failed,
      },
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to send bulk emails:", error);
    return res.status(500).json({
      message: "Failed to send bulk emails",
      error: error.message,
    });
  }
};

// Test IMAP connection
export const testImapConfiguration = async (req, res, next) => {
  try {
    const isConnected = await verifyImapConnection();

    if (isConnected) {
      return res.status(200).json({
        message: "IMAP connection successful",
        status: "connected",
        timestamp: new Date().toISOString(),
      });
    } else {
      return res.status(500).json({
        message: "IMAP connection failed",
        status: "disconnected",
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("IMAP test error:", error);
    return res.status(500).json({
      message: "IMAP connection test failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

// Get inbox emails with filtering and pagination
export const getInboxEmails = async (req, res, next) => {
  try {
    const {
      limit = 50,
      page = 1,
      search = "",
      from = "",
      to = "",
      subject = "",
      dateFrom = "",
      dateTo = "",
      unreadOnly = false,
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const options = {
      limit: parseInt(limit),
      offset: offset,
      search: search,
      from: from,
      to: to,
      subject: subject,
      dateFrom: dateFrom,
      dateTo: dateTo,
      unreadOnly: unreadOnly === "true",
    };

    const result = await fetchInboxEmails(options);

    return res.status(200).json({
      message: "Inbox emails retrieved successfully",
      emails: result.emails,
      pagination: result.pagination,
      filters: {
        search: search || null,
        from: from || null,
        to: to || null,
        subject: subject || null,
        dateFrom: dateFrom || null,
        dateTo: dateTo || null,
        unreadOnly: unreadOnly === "true",
      },
    });
  } catch (error) {
    console.error("Error fetching inbox emails:", error);
    return res.status(500).json({
      message: "Failed to fetch inbox emails",
      error: error.message,
    });
  }
};

// Get specific email by UID
export const getEmailById = async (req, res, next) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        message: "Email UID is required",
      });
    }

    const email = await getEmailByUid(parseInt(uid));

    if (!email) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    return res.status(200).json({
      message: "Email retrieved successfully",
      email: email,
    });
  } catch (error) {
    console.error("Error fetching email:", error);
    return res.status(500).json({
      message: "Failed to fetch email",
      error: error.message,
    });
  }
};

// Mark email as read/unread
export const markEmailReadStatus = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { read = true } = req.body;

    if (!uid) {
      return res.status(400).json({
        message: "Email UID is required",
      });
    }

    const result = await markEmailAsRead(parseInt(uid), read);

    return res.status(200).json({
      message: result.message,
      success: result.success,
      emailUid: uid,
      readStatus: read,
    });
  } catch (error) {
    console.error("Error marking email read status:", error);
    return res.status(500).json({
      message: "Failed to update email read status",
      error: error.message,
    });
  }
};

// Delete email
export const deleteInboxEmail = async (req, res, next) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        message: "Email UID is required",
      });
    }

    const result = await deleteEmail(parseInt(uid));

    return res.status(200).json({
      message: result.message,
      success: result.success,
      emailUid: uid,
    });
  } catch (error) {
    console.error("Error deleting email:", error);
    return res.status(500).json({
      message: "Failed to delete email",
      error: error.message,
    });
  }
};

// Get inbox statistics
export const getInboxStats = async (req, res, next) => {
  try {
    // Get total emails
    const totalEmails = await fetchInboxEmails({ limit: 1, offset: 0 });

    // Get unread emails
    const unreadEmails = await fetchInboxEmails({
      limit: 1,
      offset: 0,
      unreadOnly: true,
    });

    // Get today's emails
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEmails = await fetchInboxEmails({
      limit: 1,
      offset: 0,
      dateFrom: today.toISOString(),
    });

    // Get this week's emails
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekEmails = await fetchInboxEmails({
      limit: 1,
      offset: 0,
      dateFrom: weekAgo.toISOString(),
    });

    const stats = {
      total: totalEmails.total || 0,
      unread: unreadEmails.total || 0,
      today: todayEmails.total || 0,
      thisWeek: weekEmails.total || 0,
      read: (totalEmails.total || 0) - (unreadEmails.total || 0),
    };

    return res.status(200).json({
      message: "Inbox statistics retrieved successfully",
      stats: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching inbox stats:", error);
    return res.status(500).json({
      message: "Failed to fetch inbox statistics",
      error: error.message,
    });
  }
};

// Test SMS configuration
export const testSMSConfiguration = async (req, res, next) => {
  try {
    const { testPhoneNumber } = req.body;

    const result = await testSMSConfigurationService(testPhoneNumber);

    if (result.success) {
      return res.status(200).json({
        message: "SMS configuration test successful",
        status: "connected",
        testResult: result.testResult,
        timestamp: new Date().toISOString(),
      });
    } else {
      return res.status(500).json({
        message: "SMS configuration test failed",
        status: "disconnected",
        error: result.error,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("SMS test error:", error);
    return res.status(500).json({
      message: "SMS configuration test failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

// Send single SMS
export const sendSingleSMS = async (req, res, next) => {
  try {
    const { phoneNumber, message, dlr = "" } = req.body;

    // Validate required fields
    if (!phoneNumber || !message) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["phoneNumber", "message"],
        received: {
          phoneNumber: !!phoneNumber,
          message: !!message,
        },
      });
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[0-9+\-\s\(\)]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: "Invalid phone number format",
        phoneNumber: phoneNumber,
      });
    }

    // Validate message length
    if (message.length > 160) {
      return res.status(400).json({
        message: "Message too long. Maximum 160 characters allowed.",
        messageLength: message.length,
        maxLength: 160,
      });
    }

    // Send SMS
    const result = await sendSingleSMSService(phoneNumber, message, dlr);

    // Log audit
    await logAudit({
      userId: req.user._id,
      action: "Send Single SMS",
      userName: req.user.name || "Unknown User",
      entity: "SMS",
      entityId: result.messageId || `sms_${Date.now()}`,
      oldValue: null,
      newValue: {
        phoneNumber: phoneNumber,
        message: message,
        messageId: result.messageId,
        status: result.status,
        timestamp: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      message: "SMS sent successfully",
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to send SMS:", error);
    return res.status(500).json({
      message: "Failed to send SMS",
      error: error.message,
    });
  }
};

// Send bulk SMS
export const sendBulkSMS = async (req, res, next) => {
  try {
    console.log("🔍 Bulk SMS Debug - Request received");
    console.log("🔍 Request body:", JSON.stringify(req.body, null, 2));
    console.log("🔍 Request body type:", typeof req.body);
    console.log("🔍 Request body keys:", Object.keys(req.body || {}));
    console.log("🔍 Request headers:", JSON.stringify(req.headers, null, 2));
    console.log("🔍 Content-Type header:", req.headers["content-type"]);

    const { recipients, message } = req.body;

    console.log("🔍 Extracted recipients:", recipients);
    console.log("🔍 Extracted message:", message);
    console.log("🔍 Recipients type:", typeof recipients);
    console.log("🔍 Recipients is array:", Array.isArray(recipients));
    console.log(
      "🔍 Recipients length:",
      recipients ? recipients.length : "undefined"
    );

    // Fix: Convert object with numeric keys to array if needed
    let recipientsArray = recipients;
    if (
      recipients &&
      typeof recipients === "object" &&
      !Array.isArray(recipients)
    ) {
      console.log("🔧 Converting object to array...");
      recipientsArray = Object.values(recipients);
      console.log("🔧 Converted recipients:", recipientsArray);
    }

    // Validate required fields
    console.log("🔍 Validation check - recipientsArray:", recipientsArray);
    console.log(
      "🔍 Validation check - recipientsArray type:",
      typeof recipientsArray
    );
    console.log(
      "🔍 Validation check - is array:",
      Array.isArray(recipientsArray)
    );
    console.log(
      "🔍 Validation check - length:",
      recipientsArray ? recipientsArray.length : "undefined"
    );

    if (!recipientsArray) {
      console.log("❌ Validation failed: recipientsArray is null/undefined");
      return res.status(400).json({
        message: "Recipients array is required and must not be empty",
      });
    }

    if (!Array.isArray(recipientsArray)) {
      console.log("❌ Validation failed: recipientsArray is not an array");
      return res.status(400).json({
        message: "Recipients must be an array",
      });
    }

    if (recipientsArray.length === 0) {
      console.log("❌ Validation failed: recipientsArray is empty");
      return res.status(400).json({
        message: "Recipients array must not be empty",
      });
    }

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Validate message length
    if (message.length > 160) {
      return res.status(400).json({
        message: "Message too long. Maximum 160 characters allowed.",
        messageLength: message.length,
        maxLength: 160,
      });
    }

    // Validate phone numbers
    const phoneRegex = /^[0-9+\-\s\(\)]+$/;
    const invalidNumbers = recipientsArray.filter(
      (phone) => !phoneRegex.test(phone)
    );

    if (invalidNumbers.length > 0) {
      return res.status(400).json({
        message: "Invalid phone number format found",
        invalidNumbers: invalidNumbers,
      });
    }

    // Remove duplicates
    const uniqueRecipients = [...new Set(recipientsArray)];

    // Send bulk SMS
    const result = await sendBulkSMSService(uniqueRecipients, message);

    // Log audit
    await logAudit({
      userId: req.user._id,
      action: "Send Bulk SMS",
      userName: req.user.name || "Unknown User",
      entity: "SMS",
      entityId: `bulk_sms_${Date.now()}`,
      oldValue: null,
      newValue: {
        totalRecipients: uniqueRecipients.length,
        successful: result.successful,
        failed: result.failed,
        message: message,
        timestamp: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      message: "Bulk SMS operation completed",
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to send bulk SMS:", error);
    return res.status(500).json({
      message: "Failed to send bulk SMS",
      error: error.message,
    });
  }
};

// Get SMS service status
export const getSMSStatus = async (req, res, next) => {
  try {
    const status = getSMSServiceStatus();

    return res.status(200).json({
      message: "SMS service status retrieved successfully",
      status: status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error getting SMS status:", error);
    return res.status(500).json({
      message: "Failed to get SMS service status",
      error: error.message,
    });
  }
};
