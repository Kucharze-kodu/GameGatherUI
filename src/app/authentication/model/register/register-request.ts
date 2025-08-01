export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthday: Date;
    verifyEmailUrl: string;
}