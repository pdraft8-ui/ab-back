export class MongoRoadServiceRepository extends IRoadServiceRepository {
    create(roadServiceData: any): Promise<RoadService>;
    findById(id: any): Promise<RoadService>;
    findByName(companyName: any): Promise<RoadService>;
    findAll(): Promise<RoadService[]>;
    update(id: any, roadServiceData: any): Promise<RoadService>;
    delete(id: any): Promise<RoadService>;
    getStats(): Promise<{
        totalServices: number;
        servicesUnder2007: number;
        servicesOver2007: number;
        averageAmount: any;
        averageAmountUnder2007: any;
    }>;
    countServices(): Promise<number>;
    mapToRoadServiceEntity(roadServiceDoc: any): RoadService;
}
import { IRoadServiceRepository } from "../../domain/interfaces/IRoadServiceRepository.js";
import { RoadService } from "../../domain/entities/RoadService.entity.js";
//# sourceMappingURL=MongoRoadServiceRepository.d.ts.map