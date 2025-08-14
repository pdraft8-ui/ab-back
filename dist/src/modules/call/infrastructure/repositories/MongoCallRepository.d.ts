export class MongoCallRepository extends ICallRepository {
    create(callData: any): Promise<Call>;
    findByCallId(callid: any): Promise<Call>;
    findByCustomerId(customerId: any): Promise<Call[]>;
    findAll(): Promise<Call[]>;
    update(id: any, callData: any): Promise<Call>;
    delete(id: any): Promise<Call>;
    getStats(): Promise<{
        totalCalls: number;
        callsWithRecordings: number;
        callsWithoutRecordings: number;
        todayCalls: number;
        weeklyCalls: number;
        recordingPercentage: number;
    }>;
    countCalls(): Promise<number>;
    mapToCallEntity(callDoc: any): Call;
}
import { ICallRepository } from "../../domain/interfaces/ICallRepository.js";
import { Call } from "../../domain/entities/Call.entity.js";
//# sourceMappingURL=MongoCallRepository.d.ts.map