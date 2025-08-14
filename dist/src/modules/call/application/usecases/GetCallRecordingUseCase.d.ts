export class GetCallRecordingUseCase {
    constructor(callRepository: any, recordingService: any);
    callRepository: any;
    recordingService: any;
    execute(callid: any, tokenId: any, customerId: any): Promise<{
        message: string;
        callid: any;
        customerId: any;
        recordingUrl: any;
        fromDatabase: boolean;
    }>;
}
//# sourceMappingURL=GetCallRecordingUseCase.d.ts.map