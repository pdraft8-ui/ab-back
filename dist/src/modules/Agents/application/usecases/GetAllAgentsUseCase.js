export class GetAllAgentsUseCase {
    constructor(agentRepository) {
        this.agentRepository = agentRepository;
    }
    async execute(filters = {}, pagination = {}) {
        try {
            const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", } = pagination;
            const { search, dateRange } = filters;
            let agents = await this.agentRepository.findAll();
            // Apply search filter
            if (search) {
                agents = agents.filter((agent) => agent.getName().toLowerCase().includes(search.toLowerCase()) ||
                    agent.getEmail().toLowerCase().includes(search.toLowerCase()) ||
                    agent.getPhone().includes(search));
            }
            // Apply date range filter
            if (dateRange && dateRange.startDate && dateRange.endDate) {
                agents = agents.filter((agent) => {
                    const createdAt = new Date(agent.getCreatedAt());
                    const startDate = new Date(dateRange.startDate);
                    const endDate = new Date(dateRange.endDate);
                    return createdAt >= startDate && createdAt <= endDate;
                });
            }
            // Apply sorting
            agents.sort((a, b) => {
                let aValue, bValue;
                switch (sortBy) {
                    case "name":
                        aValue = a.getName().toLowerCase();
                        bValue = b.getName().toLowerCase();
                        break;
                    case "email":
                        aValue = a.getEmail().toLowerCase();
                        bValue = b.getEmail().toLowerCase();
                        break;
                    case "phone":
                        aValue = a.getPhone();
                        bValue = b.getPhone();
                        break;
                    case "createdAt":
                    default:
                        aValue = new Date(a.getCreatedAt());
                        bValue = new Date(b.getCreatedAt());
                        break;
                }
                if (sortOrder === "asc") {
                    return aValue > bValue ? 1 : -1;
                }
                else {
                    return aValue < bValue ? 1 : -1;
                }
            });
            // Apply pagination
            const totalCount = agents.length;
            const totalPages = Math.ceil(totalCount / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedAgents = agents.slice(startIndex, endIndex);
            return {
                success: true,
                message: "Agents retrieved successfully",
                data: {
                    agents: paginatedAgents.map((agent) => agent.toJSON()),
                    pagination: {
                        page,
                        limit,
                        totalCount,
                        totalPages,
                        hasNextPage: page < totalPages,
                        hasPrevPage: page > 1,
                    },
                },
            };
        }
        catch (error) {
            console.error("Error in GetAllAgentsUseCase:", error);
            return {
                success: false,
                message: "Failed to retrieve agents",
                error: error.message,
            };
        }
    }
}
//# sourceMappingURL=GetAllAgentsUseCase.js.map