export class DocumentSettingsController {
    constructor(createDocumentSettingsUseCase: any, getAllDocumentSettingsUseCase: any, getDocumentSettingsByIdUseCase: any, getDocumentSettingsByTypeUseCase: any, updateDocumentSettingsUseCase: any, deleteDocumentSettingsUseCase: any, toggleDocumentSettingsStatusUseCase: any, uploadHeaderLogoUseCase: any, uploadFooterLogoUseCase: any, uploadSignatureUseCase: any, getDocumentSettingsStatsUseCase: any);
    createDocumentSettingsUseCase: any;
    getAllDocumentSettingsUseCase: any;
    getDocumentSettingsByIdUseCase: any;
    getDocumentSettingsByTypeUseCase: any;
    updateDocumentSettingsUseCase: any;
    deleteDocumentSettingsUseCase: any;
    toggleDocumentSettingsStatusUseCase: any;
    uploadHeaderLogoUseCase: any;
    uploadFooterLogoUseCase: any;
    uploadSignatureUseCase: any;
    getDocumentSettingsStatsUseCase: any;
    convertDocumentSettingsToFullUrls(settings: any): any;
    createDocumentSettings(req: any, res: any, next: any): Promise<void>;
    getAllDocumentSettings(req: any, res: any, next: any): Promise<void>;
    getDocumentSettingsById(req: any, res: any, next: any): Promise<void>;
    getDocumentSettingsByType(req: any, res: any, next: any): Promise<void>;
    updateDocumentSettings(req: any, res: any, next: any): Promise<void>;
    deleteDocumentSettings(req: any, res: any, next: any): Promise<void>;
    toggleDocumentSettingsStatus(req: any, res: any, next: any): Promise<void>;
    uploadHeaderLogo(req: any, res: any, next: any): Promise<any>;
    uploadFooterLogo(req: any, res: any, next: any): Promise<any>;
    uploadSignature(req: any, res: any, next: any): Promise<any>;
    getDocumentSettingsStats(req: any, res: any, next: any): Promise<void>;
}
//# sourceMappingURL=DocumentSettingsController.d.ts.map