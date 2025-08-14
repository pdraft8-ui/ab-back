export class Call {
    static fromJSON(data: any): Call;
    static create(data: any): Call;
    constructor(data: any);
    id: any;
    callid: any;
    recordingUrl: any;
    customerId: any;
    createdAt: any;
    updatedAt: any;
    isValid(): boolean;
    isValidCallId(callid: any): boolean;
    isValidRecordingUrl(recordingUrl: any): boolean;
    getCallId(): any;
    getRecordingUrl(): any;
    getCustomerId(): any;
    updateRecordingUrl(recordingUrl: any): this;
    hasRecording(): boolean;
    toJSON(): {
        id: any;
        callid: any;
        recordingUrl: any;
        customerId: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=Call.entity.d.ts.map