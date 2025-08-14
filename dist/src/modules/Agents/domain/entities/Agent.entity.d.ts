export class Agent {
    static create(data: any): Agent;
    static fromMongoDoc(mongoDoc: any): Agent;
    constructor(data: any);
    id: any;
    name: any;
    email: any;
    phone: any;
    createdAt: any;
    updatedAt: any;
    isValid(): {
        isValid: boolean;
        errors: string[];
    };
    isValidEmail(email: any): boolean;
    isValidPhone(phone: any): boolean;
    updateInfo(updateData: any): void;
    getId(): any;
    getName(): any;
    getEmail(): any;
    getPhone(): any;
    getCreatedAt(): any;
    getUpdatedAt(): any;
    toJSON(): {
        id: any;
        name: any;
        email: any;
        phone: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=Agent.entity.d.ts.map