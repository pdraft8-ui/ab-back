export class GetAllAlAhliaAccidentsUseCase {
    constructor({ alAhliaAccidentRepository }) {
        this.alAhliaAccidentRepository = alAhliaAccidentRepository;
    }
    async execute() {
        try {
            const accidentReports = await this.alAhliaAccidentRepository.findAll();
            return accidentReports;
        }
        catch (error) {
            throw new Error(`GetAllAlAhliaAccidentsUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=GetAllAlAhliaAccidentsUseCase.js.map