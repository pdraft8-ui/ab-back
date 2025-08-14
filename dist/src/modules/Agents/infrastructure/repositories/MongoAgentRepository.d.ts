export class MongoAgentRepository {
    create(agent: any): Promise<Agent>;
    findById(id: any): Promise<Agent>;
    findByEmail(email: any): Promise<Agent>;
    findByPhone(phone: any): Promise<Agent>;
    findAll(): Promise<Agent[]>;
    update(id: any, agent: any): Promise<Agent>;
    delete(id: any): Promise<boolean>;
    getStats(): Promise<{
        totalAgents: any;
        avgNameLength: number;
        topEmailDomains: any[];
    }>;
    countAgents(): Promise<number>;
    findByDateRange(startDate: any, endDate: any): Promise<Agent[]>;
    searchByName(name: any): Promise<Agent[]>;
}
import { Agent } from "../../domain/entities/Agent.entity.js";
//# sourceMappingURL=MongoAgentRepository.d.ts.map