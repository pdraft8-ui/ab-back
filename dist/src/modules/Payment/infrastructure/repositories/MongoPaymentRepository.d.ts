export class MongoPaymentRepository extends IPaymentRepository {
    createPayment(paymentData: any): Promise<PaymentEntity>;
    getPaymentById(id: any): Promise<PaymentEntity>;
    getAllPayments(filters?: {}): Promise<PaymentEntity[]>;
    updatePayment(id: any, updateData: any): Promise<PaymentEntity>;
    deletePayment(id: any): Promise<PaymentEntity>;
    getPaymentsByCustomer(customerId: any): Promise<PaymentEntity[]>;
    getPaymentsByInvoice(invoiceId: any): Promise<PaymentEntity[]>;
    getPaymentStats(filters?: {}): Promise<any>;
    refundPayment(paymentId: any, refundData: any): Promise<PaymentEntity>;
    getPaymentCountByInvoice(invoiceId: any): Promise<number>;
    createTranzilaPayment(paymentData: any): Promise<TranzilaPaymentEntity>;
    getTranzilaPaymentById(id: any): Promise<TranzilaPaymentEntity>;
    getTranzilaPaymentByTransactionId(transactionId: any): Promise<TranzilaPaymentEntity>;
    updateTranzilaPayment(id: any, updateData: any): Promise<TranzilaPaymentEntity>;
    getAllTranzilaPayments(filters?: {}): Promise<TranzilaPaymentEntity[]>;
    mapToPaymentEntity(paymentDoc: any): PaymentEntity;
    mapToTranzilaPaymentEntity(paymentDoc: any): TranzilaPaymentEntity;
}
import { IPaymentRepository } from "../../domain/interfaces/IPaymentRepository.js";
import { Payment as PaymentEntity } from "../../domain/entities/Payment.entity.js";
import { TranzilaPayment as TranzilaPaymentEntity } from "../../domain/entities/TranzilaPayment.entity.js";
//# sourceMappingURL=MongoPaymentRepository.d.ts.map