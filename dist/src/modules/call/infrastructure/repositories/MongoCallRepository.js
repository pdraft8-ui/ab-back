import { ICallRepository } from "../../domain/interfaces/ICallRepository.js";
import { Call } from "../../domain/entities/Call.entity.js";
import CallModel from "../../../../../DB/models/call.model.js";
export class MongoCallRepository extends ICallRepository {
    async create(callData) {
        try {
            const call = new CallModel(callData);
            const savedCall = await call.save();
            return this.mapToCallEntity(savedCall);
        }
        catch (error) {
            console.error("MongoCallRepository create error:", error);
            throw error;
        }
    }
    async findByCallId(callid) {
        try {
            const call = await CallModel.findOne({ callid });
            return call ? this.mapToCallEntity(call) : null;
        }
        catch (error) {
            console.error("MongoCallRepository findByCallId error:", error);
            throw error;
        }
    }
    async findByCustomerId(customerId) {
        try {
            const calls = await CallModel.find({ customerId }).sort({
                createdAt: -1,
            });
            return calls.map((call) => this.mapToCallEntity(call));
        }
        catch (error) {
            console.error("MongoCallRepository findByCustomerId error:", error);
            throw error;
        }
    }
    async findAll() {
        try {
            const calls = await CallModel.find().sort({ createdAt: -1 });
            return calls.map((call) => this.mapToCallEntity(call));
        }
        catch (error) {
            console.error("MongoCallRepository findAll error:", error);
            throw error;
        }
    }
    async update(id, callData) {
        try {
            const updatedCall = await CallModel.findByIdAndUpdate(id, callData, {
                new: true,
            });
            return updatedCall ? this.mapToCallEntity(updatedCall) : null;
        }
        catch (error) {
            console.error("MongoCallRepository update error:", error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const deletedCall = await CallModel.findByIdAndDelete(id);
            return deletedCall ? this.mapToCallEntity(deletedCall) : null;
        }
        catch (error) {
            console.error("MongoCallRepository delete error:", error);
            throw error;
        }
    }
    async getStats() {
        try {
            const totalCalls = await CallModel.countDocuments();
            const callsWithRecordings = await CallModel.countDocuments({
                recordingUrl: { $exists: true, $ne: null, $ne: "" },
            });
            const callsWithoutRecordings = await CallModel.countDocuments({
                $or: [
                    { recordingUrl: { $exists: false } },
                    { recordingUrl: null },
                    { recordingUrl: "" },
                ],
            });
            const todayCalls = await CallModel.countDocuments({
                createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
            });
            const weeklyCalls = await CallModel.countDocuments({
                createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
            });
            return {
                totalCalls,
                callsWithRecordings,
                callsWithoutRecordings,
                todayCalls,
                weeklyCalls,
                recordingPercentage: totalCalls > 0
                    ? Math.round((callsWithRecordings / totalCalls) * 100)
                    : 0,
            };
        }
        catch (error) {
            console.error("MongoCallRepository getStats error:", error);
            throw error;
        }
    }
    async countCalls() {
        try {
            return await CallModel.countDocuments();
        }
        catch (error) {
            console.error("MongoCallRepository countCalls error:", error);
            throw error;
        }
    }
    mapToCallEntity(callDoc) {
        return new Call({
            id: callDoc._id,
            callid: callDoc.callid,
            recordingUrl: callDoc.recordingUrl,
            customerId: callDoc.customerId,
            createdAt: callDoc.createdAt,
            updatedAt: callDoc.updatedAt,
        });
    }
}
//# sourceMappingURL=MongoCallRepository.js.map