var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsObject, IsOptional, IsString, MaxLength, } from 'class-validator';
export class CreateScoutDto {
    fullName;
    profilePicture;
    organization;
    country;
    state;
    city;
    role;
    biography;
    contactEmail;
    contactPhone;
    socialMediaLinks;
}
__decorate([
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "fullName", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "profilePicture", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "organization", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "country", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "state", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "city", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "role", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "biography", void 0);
__decorate([
    IsOptional(),
    IsEmail(),
    MaxLength(320),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "contactEmail", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateScoutDto.prototype, "contactPhone", void 0);
__decorate([
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateScoutDto.prototype, "socialMediaLinks", void 0);
//# sourceMappingURL=create-scout.dto.js.map