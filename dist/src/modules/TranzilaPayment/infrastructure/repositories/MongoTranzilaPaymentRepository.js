import { ITranzilaPaymentRepository } from "../../domain/interfaces/ITranzilaPaymentRepository.js";
import TranzilaPayment from "../../../../../DB/models/TranzilaPayment.model.js";
import { TranzilaPayment as TranzilaPaymentEntity } from "../../domain/entities/TranzilaPayment.entity.js";
export class MongoTranzilaPaymentRepository extends ITranzilaPaymentRepository {
    async createTranzilaPayment(paymentData) {
        try {
            const payment = new TranzilaPayment(paymentData);
            const savedPayment = await payment.save();
            return this.mapToTranzilaPaymentEntity(savedPayment);
        }
        catch (error) {
            throw new Error(`Failed to create Tranzila payment: ${error.message}`);
        }
    }
    async findTranzilaPaymentByPaymentId(paymentId) {
        try {
            const payment = await TranzilaPayment.findOne({ paymentId });
            return payment ? this.mapToTranzilaPaymentEntity(payment) : null;
        }
        catch (error) {
            throw new Error(`Failed to find Tranzila payment: ${error.message}`);
        }
    }
    async updateTranzilaPayment(id, updateData) {
        try {
            const payment = await TranzilaPayment.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true });
            return payment ? this.mapToTranzilaPaymentEntity(payment) : null;
        }
        catch (error) {
            throw new Error(`Failed to update Tranzila payment: ${error.message}`);
        }
    }
    async getAllTranzilaPayments(filters = {}) {
        try {
            const query = {};
            if (filters.status) {
                query.status = filters.status;
            }
            if (filters.startDate || filters.endDate) {
                query.createdAt = {};
                if (filters.startDate) {
                    query.createdAt.$gte = new Date(filters.startDate);
                }
                if (filters.endDate) {
                    query.createdAt.$lte = new Date(filters.endDate);
                }
            }
            const payments = await TranzilaPayment.find(query)
                .sort({ createdAt: -1 })
                .skip(filters.skip || 0)
                .limit(filters.limit || 10);
            return payments.map((payment) => this.mapToTranzilaPaymentEntity(payment));
        }
        catch (error) {
            throw new Error(`Failed to get Tranzila payments: ${error.message}`);
        }
    }
    async getTranzilaPaymentById(id) {
        try {
            const payment = await TranzilaPayment.findById(id);
            return payment ? this.mapToTranzilaPaymentEntity(payment) : null;
        }
        catch (error) {
            throw new Error(`Failed to get Tranzila payment: ${error.message}`);
        }
    }
    async deleteTranzilaPayment(id) {
        try {
            const payment = await TranzilaPayment.findByIdAndDelete(id);
            return payment ? this.mapToTranzilaPaymentEntity(payment) : null;
        }
        catch (error) {
            throw new Error(`Failed to delete Tranzila payment: ${error.message}`);
        }
    }
    async getTranzilaPaymentStats() {
        try {
            const stats = await TranzilaPayment.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 },
                        totalAmount: { $sum: "$amount" },
                    },
                },
            ]);
            const totalPayments = await TranzilaPayment.countDocuments();
            const totalAmount = await TranzilaPayment.aggregate([
                { $group: { _id: null, total: { $sum: "$amount" } } },
            ]);
            return {
                statusBreakdown: stats,
                totalPayments,
                totalAmount: totalAmount[0]?.total || 0,
            };
        }
        catch (error) {
            throw new Error(`Failed to get Tranzila payment stats: ${error.message}`);
        }
    }
    mapToTranzilaPaymentEntity(paymentDoc) {
        return new TranzilaPaymentEntity({
            id: paymentDoc._id,
            paymentId: paymentDoc.paymentId,
            amount: paymentDoc.amount,
            currency: paymentDoc.currency,
            description: paymentDoc.description,
            customerEmail: paymentDoc.customerEmail,
            customerPhone: paymentDoc.customerPhone,
            customerName: paymentDoc.customerName,
            status: paymentDoc.status,
            paymentMethod: paymentDoc.paymentMethod,
            tranzilaTransactionId: paymentDoc.tranzilaTransactionId,
            paymentUrl: paymentDoc.paymentUrl,
            completedAt: paymentDoc.completedAt,
            failedAt: paymentDoc.failedAt,
            errorMessage: paymentDoc.errorMessage,
            refundAmount: paymentDoc.refundAmount,
            refundReason: paymentDoc.refundReason,
            refundedAt: paymentDoc.refundedAt,
            createdBy: paymentDoc.createdBy,
            updatedBy: paymentDoc.updatedBy,
            createdAt: paymentDoc.createdAt,
            updatedAt: paymentDoc.updatedAt,
            tranzilaResponse: paymentDoc.tranzilaResponse,
        });
    }
}
//# sourceMappingURL=MongoTranzilaPaymentRepository.js.map