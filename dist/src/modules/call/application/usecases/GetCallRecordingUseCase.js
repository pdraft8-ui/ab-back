import { Call } from "../../domain/entities/Call.entity.js";
export class GetCallRecordingUseCase {
    constructor(callRepository, recordingService) {
        this.callRepository = callRepository;
        this.recordingService = recordingService;
    }
    async execute(callid, tokenId, customerId) {
        try {
            // Validate input data
            if (!callid || !tokenId) {
                throw new Error("callid and token_id are required");
            }
            if (!customerId) {
                throw new Error("customerId is required");
            }
            // Check if call already exists in database
            let call = await this.callRepository.findByCallId(callid);
            if (call) {
                return {
                    message: "Call retrieved from the database",
                    callid: call.callid,
                    customerId: call.customerId,
                    recordingUrl: call.recordingUrl,
                    fromDatabase: true,
                };
            }
            // Get recording URL from external service
            const recordingUrl = await this.recordingService.getRecordingPath(callid, tokenId);
            if (!recordingUrl) {
                throw new Error("Recording not found or request timed out");
            }
            // Create call entity
            const callData = {
                callid,
                customerId,
                recordingUrl,
            };
            const callEntity = new Call(callData);
            if (!callEntity.isValid()) {
                throw new Error("Invalid call data");
            }
            // Save to repository
            const createdCall = await this.callRepository.create(callData);
            return {
                message: "Call created and recording saved",
                callid: createdCall.callid,
                customerId: createdCall.customerId,
                recordingUrl: createdCall.recordingUrl,
                fromDatabase: false,
            };
        }
        catch (error) {
            console.error("GetCallRecordingUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetCallRecordingUseCase.js.map