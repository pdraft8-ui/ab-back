export class IPaymentRepository {
    createPayment(paymentData: any): Promise<void>;
    getPaymentById(id: any): Promise<void>;
    getAllPayments(filters?: {}): Promise<void>;
    updatePayment(id: any, updateData: any): Promise<void>;
    deletePayment(id: any): Promise<void>;
    getPaymentsByCustomer(customerId: any): Promise<void>;
    getPaymentsByInvoice(invoiceId: any): Promise<void>;
    getPaymentStats(filters?: {}): Promise<void>;
    refundPayment(paymentId: any, refundData: any): Promise<void>;
    getPaymentCountByInvoice(invoiceId: any): Promise<void>;
    createTranzilaPayment(paymentData: any): Promise<void>;
    getTranzilaPaymentById(id: any): Promise<void>;
    getTranzilaPaymentByTransactionId(transactionId: any): Promise<void>;
    updateTranzilaPayment(id: any, updateData: any): Promise<void>;
    getAllTranzilaPayments(filters?: {}): Promise<void>;
}
//# sourceMappingURL=IPaymentRepository.d.ts.map