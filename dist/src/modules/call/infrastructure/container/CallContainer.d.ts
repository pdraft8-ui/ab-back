export class CallContainer {
    initializeDependencies(): void;
    callRepository: MongoCallRepository;
    recordingService: RecordingService;
    getCallRecordingUseCase: GetCallRecordingUseCase;
    getAllCallsUseCase: GetAllCallsUseCase;
    getCallsByCustomerUseCase: GetCallsByCustomerUseCase;
    getCallStatsUseCase: GetCallStatsUseCase;
    callController: CallController;
    callRoutes: CallRoutes;
    getGetCallRecordingUseCase(): GetCallRecordingUseCase;
    getGetAllCallsUseCase(): GetAllCallsUseCase;
    getGetCallsByCustomerUseCase(): GetCallsByCustomerUseCase;
    getGetCallStatsUseCase(): GetCallStatsUseCase;
    getCallController(): CallController;
    getCallRoutes(): CallRoutes;
    getCallRepository(): MongoCallRepository;
    getRecordingService(): RecordingService;
}
export class CallContainerMinimal {
    mockCallRepository: {
        create: (data: any) => Promise<Call>;
        findByCallId: (callid: any) => Promise<Call>;
        findByCustomerId: (customerId: any) => Promise<Call[]>;
        findAll: () => Promise<Call[]>;
        update: (id: any, data: any) => Promise<Call>;
        delete: (id: any) => Promise<Call>;
        getStats: () => Promise<{
            totalCalls: number;
            callsWithRecordings: number;
            callsWithoutRecordings: number;
            todayCalls: number;
            weeklyCalls: number;
            recordingPercentage: number;
        }>;
        countCalls: () => Promise<number>;
    };
    mockRecordingService: {
        getRecordingPath: (callid: any, tokenId: any) => Promise<string>;
    };
    getCallRecordingUseCase: GetCallRecordingUseCase;
    getAllCallsUseCase: GetAllCallsUseCase;
    getCallsByCustomerUseCase: GetCallsByCustomerUseCase;
    getCallStatsUseCase: GetCallStatsUseCase;
    callController: CallController;
    callRoutes: CallRoutes;
    getGetCallRecordingUseCase(): GetCallRecordingUseCase;
    getGetAllCallsUseCase(): GetAllCallsUseCase;
    getGetCallsByCustomerUseCase(): GetCallsByCustomerUseCase;
    getGetCallStatsUseCase(): GetCallStatsUseCase;
    getCallController(): CallController;
    getCallRoutes(): CallRoutes;
    getMockCallRepository(): {
        create: (data: any) => Promise<Call>;
        findByCallId: (callid: any) => Promise<Call>;
        findByCustomerId: (customerId: any) => Promise<Call[]>;
        findAll: () => Promise<Call[]>;
        update: (id: any, data: any) => Promise<Call>;
        delete: (id: any) => Promise<Call>;
        getStats: () => Promise<{
            totalCalls: number;
            callsWithRecordings: number;
            callsWithoutRecordings: number;
            todayCalls: number;
            weeklyCalls: number;
            recordingPercentage: number;
        }>;
        countCalls: () => Promise<number>;
    };
    getMockRecordingService(): {
        getRecordingPath: (callid: any, tokenId: any) => Promise<string>;
    };
}
import { MongoCallRepository } from "../repositories/MongoCallRepository.js";
import { RecordingService } from "../services/RecordingService.js";
import { GetCallRecordingUseCase } from "../../application/usecases/GetCallRecordingUseCase.js";
import { GetAllCallsUseCase } from "../../application/usecases/GetAllCallsUseCase.js";
import { GetCallsByCustomerUseCase } from "../../application/usecases/GetCallsByCustomerUseCase.js";
import { GetCallStatsUseCase } from "../../application/usecases/GetCallStatsUseCase.js";
import { CallController } from "../../presentation/controllers/CallController.js";
import { CallRoutes } from "../../presentation/routes/CallRoutes.js";
import { Call } from "../../domain/entities/Call.entity.js";
//# sourceMappingURL=CallContainer.d.ts.map