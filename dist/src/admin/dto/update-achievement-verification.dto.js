var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEnum } from 'class-validator';
export var AdminAchievementVerificationDecision;
(function (AdminAchievementVerificationDecision) {
    AdminAchievementVerificationDecision["VERIFIED"] = "VERIFIED";
    AdminAchievementVerificationDecision["REJECTED"] = "REJECTED";
})(AdminAchievementVerificationDecision || (AdminAchievementVerificationDecision = {}));
export class UpdateAchievementVerificationDto {
    verificationStatus;
}
__decorate([
    IsEnum(AdminAchievementVerificationDecision),
    __metadata("design:type", String)
], UpdateAchievementVerificationDto.prototype, "verificationStatus", void 0);
//# sourceMappingURL=update-achievement-verification.dto.js.map