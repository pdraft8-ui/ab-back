export class DeleteInsuranceCompanyUseCase {
    constructor(insuranceCompanyRepository, auditService) {
        this.insuranceCompanyRepository = insuranceCompanyRepository;
        this.auditService = auditService;
    }
    async execute(id, userId, userName) {
        try {
            if (!id) {
                throw new Error("Insurance company ID is required.");
            }
            // Check if company exists
            const existingCompany = await this.insuranceCompanyRepository.findById(id);
            if (!existingCompany) {
                throw new Error("Insurance company not found.");
            }
            // Store old value for audit
            const oldValue = existingCompany.toJSON();
            // Delete the company
            await this.insuranceCompanyRepository.delete(id);
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "DELETE",
                entity: "InsuranceCompany",
                entityId: id,
                oldValue,
            });
            return {
                success: true,
                message: "Insurance company deleted successfully.",
            };
        }
        catch (error) {
            console.error("DeleteInsuranceCompanyUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=DeleteInsuranceCompanyUseCase.js.map