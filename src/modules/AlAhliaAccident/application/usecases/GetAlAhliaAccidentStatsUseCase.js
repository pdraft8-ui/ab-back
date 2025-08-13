export class GetAlAhliaAccidentStatsUseCase {
  constructor({ alAhliaAccidentRepository }) {
    this.alAhliaAccidentRepository = alAhliaAccidentRepository;
  }

  async execute() {
    try {
      const stats = await this.alAhliaAccidentRepository.getStats();
      return stats;
    } catch (error) {
      throw new Error(`GetAlAhliaAccidentStatsUseCase error: ${error.message}`);
    }
  }
}
