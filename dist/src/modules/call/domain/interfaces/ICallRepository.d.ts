export class ICallRepository {
    create(callData: any): Promise<void>;
    findByCallId(callid: any): Promise<void>;
    findByCustomerId(customerId: any): Promise<void>;
    findAll(): Promise<void>;
    update(id: any, callData: any): Promise<void>;
    delete(id: any): Promise<void>;
    getStats(): Promise<void>;
    countCalls(): Promise<void>;
}
//# sourceMappingURL=ICallRepository.d.ts.map