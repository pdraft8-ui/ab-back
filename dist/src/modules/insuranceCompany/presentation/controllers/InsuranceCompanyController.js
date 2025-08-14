export class InsuranceCompanyController {
    constructor(createInsuranceCompanyUseCase, getAllInsuranceCompaniesUseCase, getInsuranceCompanyByIdUseCase, updateInsuranceCompanyUseCase, deleteInsuranceCompanyUseCase, getInsuranceCompanyStatsUseCase) {
        this.createInsuranceCompanyUseCase = createInsuranceCompanyUseCase;
        this.getAllInsuranceCompaniesUseCase = getAllInsuranceCompaniesUseCase;
        this.getInsuranceCompanyByIdUseCase = getInsuranceCompanyByIdUseCase;
        this.updateInsuranceCompanyUseCase = updateInsuranceCompanyUseCase;
        this.deleteInsuranceCompanyUseCase = deleteInsuranceCompanyUseCase;
        this.getInsuranceCompanyStatsUseCase = getInsuranceCompanyStatsUseCase;
    }
    async addInsuranceCompany(req, res, next) {
        try {
            const { name, contact, address, insuranceType, rates } = req.body;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const companyData = {
                name,
                contact: contact || "",
                address: address || "",
                insuranceType,
                rates: insuranceType === "mandatory" ? {} : rates,
            };
            const company = await this.createInsuranceCompanyUseCase.execute(companyData, userId, userName);
            res.status(201).json({
                success: true,
                message: "Insurance company added successfully!",
                data: company.toJSON(),
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllInsuranceCompanies(req, res, next) {
        try {
            const companies = await this.getAllInsuranceCompaniesUseCase.execute();
            res.status(200).json({
                success: true,
                message: "Insurance companies retrieved successfully!",
                data: companies.map((company) => company.toJSON()),
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getInsuranceCompanyById(req, res, next) {
        try {
            const { id } = req.params;
            const company = await this.getInsuranceCompanyByIdUseCase.execute(id);
            res.status(200).json({
                success: true,
                message: "Insurance company retrieved successfully!",
                data: company.toJSON(),
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateInsuranceCompany(req, res, next) {
        try {
            const { id } = req.params;
            const { name, contact, address, insuranceType, rates } = req.body;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const updateData = { name, contact, address, insuranceType };
            if (insuranceType !== "mandatory") {
                updateData.rates = rates;
            }
            const company = await this.updateInsuranceCompanyUseCase.execute(id, updateData, userId, userName);
            res.status(200).json({
                success: true,
                message: "Insurance company updated successfully!",
                data: company.toJSON(),
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteInsuranceCompany(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            const userName = req.user?.name || "Unknown User";
            const result = await this.deleteInsuranceCompanyUseCase.execute(id, userId, userName);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getInsuranceCompanyStats(req, res, next) {
        try {
            const stats = await this.getInsuranceCompanyStatsUseCase.execute();
            res.status(200).json({
                success: true,
                message: "Insurance company statistics retrieved successfully!",
                data: stats,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=InsuranceCompanyController.js.map