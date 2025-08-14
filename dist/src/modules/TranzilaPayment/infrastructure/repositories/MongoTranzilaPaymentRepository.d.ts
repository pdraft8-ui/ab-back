export class MongoTranzilaPaymentRepository extends ITranzilaPaymentRepository {
    createTranzilaPayment(paymentData: any): Promise<TranzilaPaymentEntity>;
    findTranzilaPaymentByPaymentId(paymentId: any): Promise<TranzilaPaymentEntity>;
    updateTranzilaPayment(id: any, updateData: any): Promise<TranzilaPaymentEntity>;
    getAllTranzilaPayments(filters?: {}): Promise<TranzilaPaymentEntity[]>;
    getTranzilaPaymentById(id: any): Promise<TranzilaPaymentEntity>;
    deleteTranzilaPayment(id: any): Promise<TranzilaPaymentEntity>;
    getTranzilaPaymentStats(): Promise<{
        statusBreakdown: any[];
        totalPayments: number;
        totalAmount: any;
    }>;
    mapToTranzilaPaymentEntity(paymentDoc: any): TranzilaPaymentEntity;
}
import { ITranzilaPaymentRepository } from "../../domain/interfaces/ITranzilaPaymentRepository.js";
import { TranzilaPayment as TranzilaPaymentEntity } from "../../domain/entities/TranzilaPayment.entity.js";
//# sourceMappingURL=MongoTranzilaPaymentRepository.d.ts.map