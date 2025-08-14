export class GetAllAgentsUseCase {
    constructor(agentRepository: any);
    agentRepository: any;
    execute(filters?: {}, pagination?: {}): Promise<{
        success: boolean;
        message: string;
        data: {
            agents: any;
            pagination: {
                page: any;
                limit: any;
                totalCount: any;
                totalPages: number;
                hasNextPage: boolean;
                hasPrevPage: boolean;
            };
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=GetAllAgentsUseCase.d.ts.map