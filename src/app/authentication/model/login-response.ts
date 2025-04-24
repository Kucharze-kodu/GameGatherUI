export interface LoginResponse {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    token: string;
    tokenExpiresOnUtc: Date;
    passwordExpired: boolean;
}