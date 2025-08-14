export class CreateTranzilaPaymentUseCase {
    constructor(paymentRepository: any, tranzilaService: any, invoiceRepository: any, customerRepository: any, notificationService: any);
    paymentRepository: any;
    tranzilaService: any;
    invoiceRepository: any;
    customerRepository: any;
    notificationService: any;
    execute(paymentData: any, userId: any): Promise<{
        success: boolean;
        message: string;
        data: {
            paymentId: any;
            paymentUrl: any;
            amount: any;
            currency: any;
            status: any;
            invoiceNumber: any;
            customerName: any;
        };
    }>;
    validateInput(paymentData: any): {
        isValid: boolean;
        error: string;
    } | {
        isValid: boolean;
        error?: undefined;
    };
    buildTranzilaRequest(payment: any, invoice: any, customer: any): {
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
//# sourceMappingURL=CreateTranzilaPaymentUseCase.d.ts.map