import { InsuranceCompany } from "../../domain/entities/InsuranceCompany.entity.js";
export class CreateInsuranceCompanyUseCase {
    constructor(insuranceCompanyRepository, auditService, notificationService) {
        this.insuranceCompanyRepository = insuranceCompanyRepository;
        this.auditService = auditService;
        this.notificationService = notificationService;
    }
    async execute(companyData, userId, userName) {
        try {
            const company = new InsuranceCompany(companyData);
            if (!company.isValid()) {
                throw new Error("Invalid insurance company data. Name and insurance type are required.");
            }
            // Check if rates are required for non-mandatory insurance
            if (!company.isMandatoryInsurance() && !company.hasRates()) {
                throw new Error("Rate details are required for comprehensive or third-party insurance.");
            }
            // Check if company with same name already exists
            const existingCompany = await this.insuranceCompanyRepository.findByName(company.name);
            if (existingCompany) {
                throw new Error(`Insurance company with name '${company.name}' already exists.`);
            }
            // Create the company
            const createdCompany = await this.insuranceCompanyRepository.create(companyData);
            // Send notification
            const message = `${userName} added new insurance company: ${company.name}`;
            await this.notificationService.sendNotification({
                senderId: userId,
                message,
            });
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "CREATE",
                entity: "InsuranceCompany",
                entityId: createdCompany.id,
                newValue: createdCompany.toJSON(),
            });
            return createdCompany;
        }
        catch (error) {
            console.error("CreateInsuranceCompanyUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=CreateInsuranceCompanyUseCase.js.map