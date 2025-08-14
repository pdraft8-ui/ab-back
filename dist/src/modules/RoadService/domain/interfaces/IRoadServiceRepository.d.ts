export class IRoadServiceRepository {
    create(roadServiceData: any): Promise<void>;
    findById(id: any): Promise<void>;
    findByName(companyName: any): Promise<void>;
    findAll(): Promise<void>;
    update(id: any, roadServiceData: any): Promise<void>;
    delete(id: any): Promise<void>;
    getStats(): Promise<void>;
    countServices(): Promise<void>;
}
//# sourceMappingURL=IRoadServiceRepository.d.ts.map