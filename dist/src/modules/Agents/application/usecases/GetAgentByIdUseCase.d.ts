export class GetAgentByIdUseCase {
    constructor(agentRepository: any);
    agentRepository: any;
    execute(agentId: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            agent: any;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=GetAgentByIdUseCase.d.ts.map