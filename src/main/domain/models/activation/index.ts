export interface ActivateUserInput {
    step: string;
    otp?: number;
}

export interface OtpDTO {
    userId: string;
    username: string;
    otp: number;
    phoneNumber: string;
    createdAt: string;
}