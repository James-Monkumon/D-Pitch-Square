var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDateString, IsEnum, IsInt, IsObject, IsOptional, IsString, Max, MaxLength, Min, } from 'class-validator';
import { PlayerPosition, PreferredFoot, } from '@prisma/client';
export class CreatePlayerDto {
    fullName;
    profilePicture;
    coverPhoto;
    dateOfBirth;
    nationality;
    country;
    state;
    city;
    address;
    height;
    weight;
    preferredFoot;
    primaryPosition;
    secondaryPosition;
    jerseyNumber;
    currentClub;
    currentAcademyName;
    biography;
    contactInformation;
    socialMediaLinks;
}
__decorate([
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "fullName", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "profilePicture", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "coverPhoto", void 0);
__decorate([
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "dateOfBirth", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "nationality", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "country", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "state", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "city", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(300),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "address", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(1),
    Max(300),
    __metadata("design:type", Number)
], CreatePlayerDto.prototype, "height", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(1),
    Max(300),
    __metadata("design:type", Number)
], CreatePlayerDto.prototype, "weight", void 0);
__decorate([
    IsOptional(),
    IsEnum(PreferredFoot),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "preferredFoot", void 0);
__decorate([
    IsOptional(),
    IsEnum(PlayerPosition),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "primaryPosition", void 0);
__decorate([
    IsOptional(),
    IsEnum(PlayerPosition),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "secondaryPosition", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(0),
    Max(99),
    __metadata("design:type", Number)
], CreatePlayerDto.prototype, "jerseyNumber", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "currentClub", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(150),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "currentAcademyName", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "biography", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePlayerDto.prototype, "contactInformation", void 0);
__decorate([
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreatePlayerDto.prototype, "socialMediaLinks", void 0);
//# sourceMappingURL=create-player.dto.js.map