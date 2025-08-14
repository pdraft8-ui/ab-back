export class RoadServiceController {
    constructor(createRoadServiceUseCase: any, getAllRoadServicesUseCase: any, getRoadServiceByIdUseCase: any, updateRoadServiceUseCase: any, deleteRoadServiceUseCase: any, getRoadServiceStatsUseCase: any);
    createRoadServiceUseCase: any;
    getAllRoadServicesUseCase: any;
    getRoadServiceByIdUseCase: any;
    updateRoadServiceUseCase: any;
    deleteRoadServiceUseCase: any;
    getRoadServiceStatsUseCase: any;
    addRoadService(req: any, res: any): Promise<void>;
    getAllRoadServices(req: any, res: any): Promise<void>;
    getRoadServiceById(req: any, res: any): Promise<void>;
    updateRoadService(req: any, res: any): Promise<void>;
    deleteRoadService(req: any, res: any): Promise<void>;
    getRoadServiceStats(req: any, res: any): Promise<void>;
}
//# sourceMappingURL=RoadServiceController.d.ts.map