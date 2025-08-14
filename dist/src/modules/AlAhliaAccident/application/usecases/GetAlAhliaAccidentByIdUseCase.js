export class GetAlAhliaAccidentByIdUseCase {
    constructor({ alAhliaAccidentRepository }) {
        this.alAhliaAccidentRepository = alAhliaAccidentRepository;
    }
    async execute(id) {
        try {
            if (!id) {
                throw new Error("Accident report ID is required");
            }
            const accidentReport = await this.alAhliaAccidentRepository.findById(id);
            if (!accidentReport) {
                throw new Error("Accident report not found");
            }
            return accidentReport;
        }
        catch (error) {
            throw new Error(`GetAlAhliaAccidentByIdUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=GetAlAhliaAccidentByIdUseCase.js.map