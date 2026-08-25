var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsOptional, IsString, Max, MaxLength, Min, } from 'class-validator';
export class CreateAchievementDto {
    title;
    description;
    year;
    organization;
    imageUrl;
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
    IsOptional(),
    IsInt(),
    Min(1900),
    Max(2100),
    __metadata("design:type", Number)
], CreateAchievementDto.prototype, "year", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "organization", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateAchievementDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=create-achievement.dto.js.map