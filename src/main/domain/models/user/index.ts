export interface UserDTO {
    id?: string;
    username: string;
    password: string;
    email: string;
    fullName: string;
    telephone: string;
    status?: number;
    createdAt?: string;
}

export interface UpdateUserDTO {
    email: string;
    fullName: string;
    telephone: string;
}
