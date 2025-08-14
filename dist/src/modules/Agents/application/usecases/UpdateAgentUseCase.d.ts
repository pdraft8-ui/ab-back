export class UpdateAgentUseCase {
    constructor(agentRepository: any, auditService: any, notificationService: any);
    agentRepository: any;
    auditService: any;
    notificationService: any;
    execute(agentId: any, updateData: any, userId: any): Promise<{
        success: boolean;
        message: string;
        errors?: undefined;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        errors: string[];
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            agent: any;
        };
        errors?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        errors?: undefined;
        data?: undefined;
    }>;
}
//# sourceMappingURL=UpdateAgentUseCase.d.ts.map