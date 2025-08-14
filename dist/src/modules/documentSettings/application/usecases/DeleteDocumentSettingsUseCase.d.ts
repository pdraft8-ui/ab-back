export class DeleteDocumentSettingsUseCase {
    constructor(documentSettingsRepository: any, auditService: any);
    documentSettingsRepository: any;
    auditService: any;
    execute(id: any, userId: any, userName: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=DeleteDocumentSettingsUseCase.d.ts.map