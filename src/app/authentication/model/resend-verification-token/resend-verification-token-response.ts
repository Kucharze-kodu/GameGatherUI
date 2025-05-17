import { ResendVerificationTokenStatus } from "./resend-verification-token-status";

export interface ResendVerificationTokenResponse {
    status: ResendVerificationTokenStatus;
    /** Format: "HH:mm:ss" (np. "14:30:00") */
    timeToWait?: string;
}