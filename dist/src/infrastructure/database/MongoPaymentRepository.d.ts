export class MongoPaymentRepository extends IPaymentRepository {
    createPayment(paymentData: any): Promise<PaymentEntity>;
    getPaymentById(id: any): Promise<PaymentEntity>;
    getAllPayments(filters?: {}): Promise<{
        payments: PaymentEntity[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    updatePayment(id: any, updateData: any): Promise<PaymentEntity>;
    deletePayment(id: any): Promise<PaymentEntity>;
    getPaymentsByCustomer(customerId: any, filters?: {}): Promise<PaymentEntity[]>;
    getPaymentsByInvoice(invoiceId: any, filters?: {}): Promise<PaymentEntity[]>;
    getPaymentStats(filters?: {}): Promise<{
        overview: any;
        byMethod: any[];
    }>;
    refundPayment(id: any, refundData: any): Promise<PaymentEntity>;
    getPaymentCountByInvoice(invoiceId: any): Promise<number>;
    createTranzilaPayment(paymentData: any): Promise<TranzilaPaymentEntity>;
    getTranzilaPaymentById(id: any): Promise<TranzilaPaymentEntity>;
    updateTranzilaPayment(id: any, updateData: any): Promise<TranzilaPaymentEntity>;
    getTranzilaPaymentByTransactionId(transactionId: any): Promise<TranzilaPaymentEntity>;
    getAllTranzilaPayments(filters?: {}): Promise<{
        payments: TranzilaPaymentEntity[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    mapToEntity(paymentDoc: any): PaymentEntity;
    mapToTranzilaEntity(paymentDoc: any): TranzilaPaymentEntity;
}
import { IPaymentRepository } from "../../core/interfaces/IPaymentRepository.js";
import { Payment as PaymentEntity } from "../../core/entities/Payment.entity.js";
import { TranzilaPayment as TranzilaPaymentEntity } from "../../core/entities/TranzilaPayment.entity.js";
//# sourceMappingURL=MongoPaymentRepository.d.ts.map