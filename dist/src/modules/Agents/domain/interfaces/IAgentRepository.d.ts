export class IAgentRepository {
    create(agent: any): Promise<void>;
    findById(id: any): Promise<void>;
    findByEmail(email: any): Promise<void>;
    findByPhone(phone: any): Promise<void>;
    findAll(): Promise<void>;
    update(id: any, agent: any): Promise<void>;
    delete(id: any): Promise<void>;
    getStats(): Promise<void>;
    countAgents(): Promise<void>;
    findByDateRange(startDate: any, endDate: any): Promise<void>;
    searchByName(name: any): Promise<void>;
}
//# sourceMappingURL=IAgentRepository.d.ts.map