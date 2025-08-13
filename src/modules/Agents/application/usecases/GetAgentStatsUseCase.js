export class GetAgentStatsUseCase {
  constructor(agentRepository) {
    this.agentRepository = agentRepository;
  }

  async execute() {
    try {
      const stats = await this.agentRepository.getStats();
      const totalCount = await this.agentRepository.countAgents();

      // Calculate additional statistics
      const allAgents = await this.agentRepository.findAll();

      // Calculate agents created in last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentAgents = allAgents.filter(
        (agent) => new Date(agent.getCreatedAt()) >= thirtyDaysAgo
      );

      // Calculate agents created in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const weeklyAgents = allAgents.filter(
        (agent) => new Date(agent.getCreatedAt()) >= sevenDaysAgo
      );

      // Calculate agents created today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayAgents = allAgents.filter(
        (agent) => new Date(agent.getCreatedAt()) >= today
      );

      // Calculate growth rate (comparing this month to last month)
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const lastMonthStart = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth(),
        1
      );
      const lastMonthEnd = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0
      );

      const lastMonthAgents = allAgents.filter((agent) => {
        const createdAt = new Date(agent.getCreatedAt());
        return createdAt >= lastMonthStart && createdAt <= lastMonthEnd;
      });

      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const thisMonthAgents = allAgents.filter((agent) => {
        const createdAt = new Date(agent.getCreatedAt());
        return createdAt >= thisMonthStart;
      });

      const growthRate =
        lastMonthAgents.length > 0
          ? ((thisMonthAgents.length - lastMonthAgents.length) /
              lastMonthAgents.length) *
            100
          : 0;

      return {
        success: true,
        message: "Agent statistics retrieved successfully",
        data: {
          totalAgents: totalCount,
          recentAgents: recentAgents.length,
          weeklyAgents: weeklyAgents.length,
          todayAgents: todayAgents.length,
          growthRate: Math.round(growthRate * 100) / 100,
          monthlyComparison: {
            thisMonth: thisMonthAgents.length,
            lastMonth: lastMonthAgents.length,
          },
          ...stats,
        },
      };
    } catch (error) {
      console.error("Error in GetAgentStatsUseCase:", error);
      return {
        success: false,
        message: "Failed to retrieve agent statistics",
        error: error.message,
      };
    }
  }
}
