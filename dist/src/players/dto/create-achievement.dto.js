var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDateString, IsEnum, IsOptional, IsString, MaxLength, } from 'class-validator';
import { AchievementType } from '@prisma/client';
export class CreateAchievementDto {
    title;
    description;
    achievementType;
    achievementDate;
    organization;
    level;
    role;
    evidenceUrl;
}
__decorate([
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "title", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "description", void 0);
__decorate([
    IsEnum(AchievementType),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "achievementType", void 0);
__decorate([
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "achievementDate", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "organization", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "level", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "role", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "evidenceUrl", void 0);
//# sourceMappingURL=create-achievement.dto.js.map