export class CallController {
    constructor(getCallRecordingUseCase: any, getAllCallsUseCase: any, getCallsByCustomerUseCase: any, getCallStatsUseCase: any);
    getCallRecordingUseCase: any;
    getAllCallsUseCase: any;
    getCallsByCustomerUseCase: any;
    getCallStatsUseCase: any;
    getCallRecording(req: any, res: any): Promise<void>;
    getAllCalls(req: any, res: any): Promise<void>;
    getCallsByCustomer(req: any, res: any): Promise<void>;
    getCallStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=CallController.d.ts.map