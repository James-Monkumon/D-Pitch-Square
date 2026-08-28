export declare enum AdminVerificationDecision {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class UpdateVerificationDto {
    verificationStatus: AdminVerificationDecision;
}
