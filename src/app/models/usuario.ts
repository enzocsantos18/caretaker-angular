export interface UsuarioRequest {
    login: string;
    email: string;
    senha: string;
    nascimento: string;
    cuidador: boolean;
}

export interface UsuarioAutenticado {
    email: string,
    username: string,
    id: number,
    token: string
}

export interface UsuarioLogin {
    login: string,
    senha: string,
}