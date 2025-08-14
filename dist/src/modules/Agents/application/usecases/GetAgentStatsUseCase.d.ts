export class GetAgentStatsUseCase {
    constructor(agentRepository: any);
    agentRepository: any;
    execute(): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
//# sourceMappingURL=GetAgentStatsUseCase.d.ts.map