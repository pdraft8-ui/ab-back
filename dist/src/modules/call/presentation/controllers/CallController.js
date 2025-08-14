export class CallController {
    constructor(getCallRecordingUseCase, getAllCallsUseCase, getCallsByCustomerUseCase, getCallStatsUseCase) {
        this.getCallRecordingUseCase = getCallRecordingUseCase;
        this.getAllCallsUseCase = getAllCallsUseCase;
        this.getCallsByCustomerUseCase = getCallsByCustomerUseCase;
        this.getCallStatsUseCase = getCallStatsUseCase;
    }
    async getCallRecording(req, res) {
        try {
            const { customerId } = req.params;
            const { callid, token_id } = req.body;
            const result = await this.getCallRecordingUseCase.execute(callid, token_id, customerId);
            const statusCode = result.fromDatabase ? 200 : 201;
            res.status(statusCode).json({
                success: true,
                ...result,
            });
        }
        catch (error) {
            console.error("CallController getCallRecording error:", error);
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getAllCalls(req, res) {
        try {
            const calls = await this.getAllCallsUseCase.execute();
            res.status(200).json({
                success: true,
                message: "Calls retrieved successfully",
                data: calls,
            });
        }
        catch (error) {
            console.error("CallController getAllCalls error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve calls",
            });
        }
    }
    async getCallsByCustomer(req, res) {
        try {
            const { customerId } = req.params;
            const calls = await this.getCallsByCustomerUseCase.execute(customerId);
            res.status(200).json({
                success: true,
                message: "Customer calls retrieved successfully",
                data: calls,
            });
        }
        catch (error) {
            console.error("CallController getCallsByCustomer error:", error);
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getCallStats(req, res) {
        try {
            const stats = await this.getCallStatsUseCase.execute();
            res.status(200).json({
                success: true,
                message: "Call statistics retrieved successfully",
                data: stats,
            });
        }
        catch (error) {
            console.error("CallController getCallStats error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to retrieve call statistics",
            });
        }
    }
}
//# sourceMappingURL=CallController.js.map