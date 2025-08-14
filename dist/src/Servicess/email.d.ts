export function sendEmail(dest: any, subject: any, message: any): Promise<{
    success: boolean;
    messageId: any;
    response: any;
}>;
export default emailService;
export function sendPasswordResetEmail(email: any, resetCode: any, userName: any): Promise<{
    success: boolean;
    messageId: any;
    response: any;
}>;
export function sendWelcomeEmail(email: any, userName: any): Promise<{
    success: boolean;
    messageId: any;
    response: any;
}>;
export function sendInvoiceNotification(email: any, invoiceData: any, customerName: any): Promise<{
    success: boolean;
    messageId: any;
    response: any;
}>;
export function sendPaymentConfirmation(email: any, paymentData: any, customerName: any): Promise<{
    success: boolean;
    messageId: any;
    response: any;
}>;
export function verifyEmailConnection(): Promise<boolean>;
export function verifyImapConnection(): Promise<any>;
export function fetchInboxEmails(options: any): Promise<any>;
export function getEmailByUid(uid: any): Promise<any>;
export function markEmailAsRead(uid: any, read: any): Promise<any>;
export function deleteEmail(uid: any): Promise<any>;
declare const emailService: EmailService;
declare class EmailService {
    transporter: any;
    imap: any;
    isConfigured: boolean;
    initTransporter(): void;
    initImap(): void;
    imapConfig: {
        user: string;
        password: string;
        host: string;
        port: number;
        tls: boolean;
        tlsOptions: {
            rejectUnauthorized: boolean;
        };
        connTimeout: number;
        authTimeout: number;
    };
    createImapConnection(): any;
    verifyImapConnection(): Promise<any>;
    verifyConnection(): Promise<boolean>;
    fetchInboxEmails(options?: {}): Promise<any>;
    getEmailByUid(uid: any): Promise<any>;
    markEmailAsRead(uid: any, read?: boolean): Promise<any>;
    deleteEmail(uid: any): Promise<any>;
    sendEmail(options: any): Promise<{
        success: boolean;
        messageId: any;
        response: any;
    }>;
    sendPasswordResetEmail(email: any, resetCode: any, userName?: string): Promise<{
        success: boolean;
        messageId: any;
        response: any;
    }>;
    sendWelcomeEmail(email: any, userName: any): Promise<{
        success: boolean;
        messageId: any;
        response: any;
    }>;
    sendInvoiceNotification(email: any, invoiceData: any, customerName: any): Promise<{
        success: boolean;
        messageId: any;
        response: any;
    }>;
    sendPaymentConfirmation(email: any, paymentData: any, customerName: any): Promise<{
        success: boolean;
        messageId: any;
        response: any;
    }>;
}
//# sourceMappingURL=email.d.ts.map