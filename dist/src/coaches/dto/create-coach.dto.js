var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsObject, IsOptional, IsString, Max, MaxLength, Min, } from 'class-validator';
export class CreateCoachDto {
    fullName;
    profilePicture;
    coverPhoto;
    country;
    state;
    city;
    currentAcademyClub;
    coachingRole;
    coachingLicense;
    coachingCertification;
    yearsOfExperience;
    biography;
    contactInformation;
    socialMediaLinks;
}
__decorate([
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "fullName", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "profilePicture", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "coverPhoto", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "country", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "state", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "city", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "currentAcademyClub", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "coachingRole", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "coachingLicense", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "coachingCertification", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], CreateCoachDto.prototype, "yearsOfExperience", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "biography", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateCoachDto.prototype, "contactInformation", void 0);
__decorate([
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateCoachDto.prototype, "socialMediaLinks", void 0);
//# sourceMappingURL=create-coach.dto.js.map