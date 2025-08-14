export function myMulter(customValidation?: any, destination?: string, maxFileSize?: number, allowedTypes?: string[]): multer.Multer;
export function myMulterImages(destination?: string): multer.Multer;
export function myMulterDocuments(destination?: string): multer.Multer;
export function myMulterAllFiles(destination?: string): multer.Multer;
export function myMulterInsuranceFiles(destination?: string): multer.Multer;
export function HME(err: any, req: any, res: any, next: any): any;
export function validateUploadedFiles(req: any, res: any, next: any): any;
export namespace fileValidation {
    namespace imag {
        function fileFilter(req: any, file: any, cb: any): void;
        namespace limits {
            export { MAX_IMAGE_SIZE as fileSize };
        }
    }
    namespace pdf {
        export function fileFilter_1(req: any, file: any, cb: any): void;
        export { fileFilter_1 as fileFilter };
        export namespace limits_1 {
            export { MAX_DOCUMENT_SIZE as fileSize };
        }
        export { limits_1 as limits };
    }
}
export function cleanupFailedUploads(req: any, res: any, next: any): void;
import multer from "multer";
declare const MAX_IMAGE_SIZE: number;
declare const MAX_DOCUMENT_SIZE: number;
export {};
//# sourceMappingURL=multer.d.ts.map