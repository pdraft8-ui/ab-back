export class ITranzilaPaymentRepository {
    createTranzilaPayment(paymentData: any): Promise<void>;
    findTranzilaPaymentByPaymentId(paymentId: any): Promise<void>;
    updateTranzilaPayment(id: any, updateData: any): Promise<void>;
    getAllTranzilaPayments(filters?: {}): Promise<void>;
    getTranzilaPaymentById(id: any): Promise<void>;
    deleteTranzilaPayment(id: any): Promise<void>;
    getTranzilaPaymentStats(): Promise<void>;
}
//# sourceMappingURL=ITranzilaPaymentRepository.d.ts.map