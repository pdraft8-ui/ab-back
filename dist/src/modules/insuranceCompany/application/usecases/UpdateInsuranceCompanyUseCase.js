import { InsuranceCompany } from "../../domain/entities/InsuranceCompany.entity.js";
export class UpdateInsuranceCompanyUseCase {
    constructor(insuranceCompanyRepository, auditService) {
        this.insuranceCompanyRepository = insuranceCompanyRepository;
        this.auditService = auditService;
    }
    async execute(id, updateData, userId, userName) {
        try {
            if (!id) {
                throw new Error("Insurance company ID is required.");
            }
            // Check if company exists
            const existingCompany = await this.insuranceCompanyRepository.findById(id);
            if (!existingCompany) {
                throw new Error("Insurance company not found.");
            }
            // Validate update data
            const company = new InsuranceCompany({
                ...existingCompany.toJSON(),
                ...updateData,
            });
            if (!company.isValid()) {
                throw new Error("Invalid insurance company data. Name and insurance type are required.");
            }
            // Check if rates are required for non-mandatory insurance
            if (!company.isMandatoryInsurance() && !company.hasRates()) {
                throw new Error("Rate details are required for comprehensive or third-party insurance.");
            }
            // Check if name is being changed and if it conflicts with existing company
            if (updateData.name && updateData.name !== existingCompany.name) {
                const companyWithSameName = await this.insuranceCompanyRepository.findByName(updateData.name);
                if (companyWithSameName && companyWithSameName.id !== id) {
                    throw new Error(`Insurance company with name '${updateData.name}' already exists.`);
                }
            }
            // Store old value for audit
            const oldValue = existingCompany.toJSON();
            // Update the company
            const updatedCompany = await this.insuranceCompanyRepository.update(id, updateData);
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "UPDATE",
                entity: "InsuranceCompany",
                entityId: id,
                oldValue,
                newValue: updatedCompany.toJSON(),
            });
            return updatedCompany;
        }
        catch (error) {
            console.error("UpdateInsuranceCompanyUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=UpdateInsuranceCompanyUseCase.js.map