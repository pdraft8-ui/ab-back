export default localStorageService;
declare const localStorageService: LocalStorageService;
declare class LocalStorageService {
    baseUrl: string;
    getFullUrl(relativePath: any): any;
    getFullUrls(relativePaths: any): any[];
    upload(file: any, folder?: string): Promise<{
        url: string;
        publicId: string;
        secure_url: string;
        public_id: string;
    }>;
    destroy(publicId: any): Promise<void>;
    uploadImage(file: any, folder?: string): Promise<{
        url: string;
        publicId: string;
        secure_url: string;
        public_id: string;
    }>;
    uploadDocument(file: any, folder?: string): Promise<{
        url: string;
        publicId: string;
        secure_url: string;
        public_id: string;
    }>;
}
//# sourceMappingURL=localStorage.d.ts.map