export class ITranzilaService {
    createPayment(paymentData: any): Promise<void>;
    checkPaymentStatus(transactionId: any): Promise<void>;
    processRefund(transactionId: any, amount: any, reason: any): Promise<void>;
    validateCredentials(): Promise<void>;
    getPaymentUrl(paymentData: any): void;
    parseResponse(response: any): void;
}
//# sourceMappingURL=ITranzilaService.d.ts.map