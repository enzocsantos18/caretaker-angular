export interface UsuarioRequest {
    login: string;
    email: string;
    senha: string;
    nascimento: string;
    cuidador: boolean;
}