export interface AuthPayload {
    id: number;
    email: string;
    name: string;
    roleId: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}