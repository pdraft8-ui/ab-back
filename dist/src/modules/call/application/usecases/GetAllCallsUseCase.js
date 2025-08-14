export class GetAllCallsUseCase {
    constructor(callRepository) {
        this.callRepository = callRepository;
    }
    async execute() {
        try {
            const calls = await this.callRepository.findAll();
            return calls;
        }
        catch (error) {
            console.error("GetAllCallsUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=GetAllCallsUseCase.js.map