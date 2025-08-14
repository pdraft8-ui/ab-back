export function sendSingleSMS(phoneNumber: any, message: any, dlr: any): Promise<{
    success: boolean;
    messageId: any;
    phoneNumber: any;
    status: string;
}>;
export function sendBulkSMS(recipients: any, message: any): Promise<{
    success: boolean;
    total: number;
    successful: number;
    failed: number;
    results: ({
        phoneNumber: any;
        success: boolean;
        messageId: any;
        status: string;
        error?: undefined;
    } | {
        phoneNumber: any;
        success: boolean;
        error: any;
        status: string;
        messageId?: undefined;
    })[];
}>;
export function testSMSConfiguration(testPhoneNumber: any): Promise<{
    success: boolean;
    message: string;
    testResult: {
        success: boolean;
        messageId: any;
        phoneNumber: any;
        status: string;
    };
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: any;
    testResult?: undefined;
}>;
export function getSMSServiceStatus(): {
    configured: boolean;
    apiUrl: string;
    username: string;
    source: string;
};
export default smsService;
declare const smsService: SMSService;
declare class SMSService {
    apiUrl: string;
    username: string;
    password: string;
    source: string;
    isConfigured: boolean;
    validateConfiguration(): boolean;
    generateSMSXML(phoneNumber: any, message: any, dlr?: string): string;
    sendSingleSMS(phoneNumber: any, message: any, dlr?: string): Promise<{
        success: boolean;
        messageId: any;
        phoneNumber: any;
        status: string;
    }>;
    sendBulkSMS(recipients: any, message: any): Promise<{
        success: boolean;
        total: number;
        successful: number;
        failed: number;
        results: ({
            phoneNumber: any;
            success: boolean;
            messageId: any;
            status: string;
            error?: undefined;
        } | {
            phoneNumber: any;
            success: boolean;
            error: any;
            status: string;
            messageId?: undefined;
        })[];
    }>;
    testSMSConfiguration(testPhoneNumber?: string): Promise<{
        success: boolean;
        message: string;
        testResult: {
            success: boolean;
            messageId: any;
            phoneNumber: any;
            status: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        testResult?: undefined;
    }>;
    getServiceStatus(): {
        configured: boolean;
        apiUrl: string;
        username: string;
        source: string;
    };
}
//# sourceMappingURL=sms.d.ts.map