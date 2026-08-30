export declare enum AdminAchievementVerificationDecision {
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED"
}
export declare class UpdateAchievementVerificationDto {
    verificationStatus: AdminAchievementVerificationDecision;
}
