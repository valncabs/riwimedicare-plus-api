// Define la estructura del payload que se incluirá en el JWT
export interface AuthPayload {
    id: number;      // Identificador único del usuario
    email: string;   // Correo electrónico del usuario
    name: string;    // Nombre del usuario
    roleId: number;  // Rol del usuario (ej. admin, médico, etc.)
}

// Extiende la interfaz Request de Express para incluir el usuario autenticado
declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload; // Se añade la propiedad opcional "user"
        }
    }
}
