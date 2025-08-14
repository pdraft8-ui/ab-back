export namespace documentSettingsEndpoints {
    namespace createDocumentSettings {
        let path: string;
        let method: string;
        let description: string;
        let roles: string[];
        namespace body {
            let documentType: string;
            let companyName: string;
            let companyAddress: string;
            let companyPhone: string;
            let companyEmail: string;
            let companyWebsite: string;
            let footerText: string;
            let termsAndConditions: string;
        }
    }
    namespace getAllDocumentSettings {
        let path_1: string;
        export { path_1 as path };
        let method_1: string;
        export { method_1 as method };
        let description_1: string;
        export { description_1 as description };
        let roles_1: string[];
        export { roles_1 as roles };
        export namespace query {
            let isActive: string;
        }
    }
    namespace getDocumentSettingsByType {
        let path_2: string;
        export { path_2 as path };
        let method_2: string;
        export { method_2 as method };
        let description_2: string;
        export { description_2 as description };
        let roles_2: string[];
        export { roles_2 as roles };
        export namespace params {
            let documentType_1: string;
            export { documentType_1 as documentType };
        }
    }
    namespace getDocumentSettingsById {
        let path_3: string;
        export { path_3 as path };
        let method_3: string;
        export { method_3 as method };
        let description_3: string;
        export { description_3 as description };
        let roles_3: string[];
        export { roles_3 as roles };
        export namespace params_1 {
            let id: string;
        }
        export { params_1 as params };
    }
    namespace updateDocumentSettings {
        let path_4: string;
        export { path_4 as path };
        let method_4: string;
        export { method_4 as method };
        let description_4: string;
        export { description_4 as description };
        let roles_4: string[];
        export { roles_4 as roles };
        export namespace params_2 {
            let id_1: string;
            export { id_1 as id };
        }
        export { params_2 as params };
        export namespace body_1 {
            let companyName_1: string;
            export { companyName_1 as companyName };
            let companyAddress_1: string;
            export { companyAddress_1 as companyAddress };
            let companyPhone_1: string;
            export { companyPhone_1 as companyPhone };
            let companyEmail_1: string;
            export { companyEmail_1 as companyEmail };
            let companyWebsite_1: string;
            export { companyWebsite_1 as companyWebsite };
            let footerText_1: string;
            export { footerText_1 as footerText };
            let termsAndConditions_1: string;
            export { termsAndConditions_1 as termsAndConditions };
            let isActive_1: string;
            export { isActive_1 as isActive };
        }
        export { body_1 as body };
    }
    namespace deleteDocumentSettings {
        let path_5: string;
        export { path_5 as path };
        let method_5: string;
        export { method_5 as method };
        let description_5: string;
        export { description_5 as description };
        let roles_5: string[];
        export { roles_5 as roles };
        export namespace params_3 {
            let id_2: string;
            export { id_2 as id };
        }
        export { params_3 as params };
    }
    namespace toggleDocumentSettingsStatus {
        let path_6: string;
        export { path_6 as path };
        let method_6: string;
        export { method_6 as method };
        let description_6: string;
        export { description_6 as description };
        let roles_6: string[];
        export { roles_6 as roles };
        export namespace params_4 {
            let id_3: string;
            export { id_3 as id };
        }
        export { params_4 as params };
    }
    namespace uploadHeaderLogo {
        let path_7: string;
        export { path_7 as path };
        let method_7: string;
        export { method_7 as method };
        let description_7: string;
        export { description_7 as description };
        let roles_7: string[];
        export { roles_7 as roles };
        export namespace params_5 {
            let documentType_2: string;
            export { documentType_2 as documentType };
        }
        export { params_5 as params };
        export namespace body_2 {
            let logo: string;
        }
        export { body_2 as body };
    }
    namespace uploadFooterLogo {
        let path_8: string;
        export { path_8 as path };
        let method_8: string;
        export { method_8 as method };
        let description_8: string;
        export { description_8 as description };
        let roles_8: string[];
        export { roles_8 as roles };
        export namespace params_6 {
            let documentType_3: string;
            export { documentType_3 as documentType };
        }
        export { params_6 as params };
        export namespace body_3 {
            let logo_1: string;
            export { logo_1 as logo };
        }
        export { body_3 as body };
    }
    namespace uploadSignature {
        let path_9: string;
        export { path_9 as path };
        let method_9: string;
        export { method_9 as method };
        let description_9: string;
        export { description_9 as description };
        let roles_9: string[];
        export { roles_9 as roles };
        export namespace params_7 {
            let documentType_4: string;
            export { documentType_4 as documentType };
        }
        export { params_7 as params };
        export namespace body_4 {
            let signature: string;
        }
        export { body_4 as body };
    }
}
//# sourceMappingURL=documentSettings.endpoints.d.ts.map