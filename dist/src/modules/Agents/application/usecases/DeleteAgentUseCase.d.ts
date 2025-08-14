export class DeleteAgentUseCase {
    constructor(agentRepository: any, auditService: any, notificationService: any);
    agentRepository: any;
    auditService: any;
    notificationService: any;
    execute(agentId: any, userId: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            agentId: any;
            agentName: any;
            agentEmail: any;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=DeleteAgentUseCase.d.ts.map