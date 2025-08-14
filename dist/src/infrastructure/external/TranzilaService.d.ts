export class TranzilaService extends ITranzilaService {
    baseURL: string;
    supplier: string;
    terminal: string;
    password: string;
    createPayment(paymentData: any): Promise<{
        success: boolean;
        paymentUrl: any;
        transactionId: any;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data: any;
        paymentUrl?: undefined;
        transactionId?: undefined;
    }>;
    checkPaymentStatus(transactionId: any): Promise<{
        success: boolean;
        status: any;
        transactionId: any;
        amount: any;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data: any;
        status?: undefined;
        transactionId?: undefined;
        amount?: undefined;
    }>;
    processRefund(transactionId: any, amount: any, reason: any): Promise<{
        success: boolean;
        refundId: any;
        amount: any;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data: any;
        refundId?: undefined;
        amount?: undefined;
    }>;
    validateCredentials(): Promise<boolean>;
    getPaymentUrl(paymentData: any): any;
    parseResponse(responseData: any): {
        success: boolean;
        paymentUrl: any;
        transactionId: any;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data: any;
        paymentUrl?: undefined;
        transactionId?: undefined;
    };
    parseStatusResponse(responseData: any): {
        success: boolean;
        status: any;
        transactionId: any;
        amount: any;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data: any;
        status?: undefined;
        transactionId?: undefined;
        amount?: undefined;
    };
    parseRefundResponse(responseData: any): {
        success: boolean;
        refundId: any;
        amount: any;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        data: any;
        refundId?: undefined;
        amount?: undefined;
    };
    buildPaymentRequest(paymentData: any): {
        supplier: string;
        terminal: string;
        password: string;
        sum: any;
        currency: any;
        payment_simple: string;
        payment_type: string;
        ccno: string;
        expmonth: string;
        expyear: string;
        myid: any;
        cred_type: string;
        tranmode: string;
        oref: any;
        uref: any;
        lang: string;
        email: any;
        phone: any;
        return_url: any;
        cancel_url: any;
    };
}
import { ITranzilaService } from "../../core/interfaces/ITranzilaService.js";
//# sourceMappingURL=TranzilaService.d.ts.map