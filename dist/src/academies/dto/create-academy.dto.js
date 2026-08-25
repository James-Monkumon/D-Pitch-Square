var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsInt, IsObject, IsOptional, IsString, IsUrl, Max, MaxLength, Min, } from 'class-validator';
export class CreateAcademyDto {
    academyName;
    logoUrl;
    coverImageUrl;
    country;
    state;
    city;
    address;
    foundedYear;
    description;
    contactEmail;
    contactPhone;
    websiteUrl;
    socialMediaLinks;
}
__decorate([
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "academyName", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "logoUrl", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "coverImageUrl", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "country", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "state", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "city", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "address", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(1800),
    Max(2100),
    __metadata("design:type", Number)
], CreateAcademyDto.prototype, "foundedYear", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "description", void 0);
__decorate([
    IsOptional(),
    IsEmail(),
    MaxLength(320),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "contactEmail", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "contactPhone", void 0);
__decorate([
    IsOptional(),
    IsUrl(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateAcademyDto.prototype, "websiteUrl", void 0);
__decorate([
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateAcademyDto.prototype, "socialMediaLinks", void 0);
//# sourceMappingURL=create-academy.dto.js.map