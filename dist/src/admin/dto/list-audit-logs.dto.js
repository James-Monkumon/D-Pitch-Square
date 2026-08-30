var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min, } from 'class-validator';
export class ListAuditLogsDto {
    action;
    targetType;
    targetId;
    actorUserId;
    limit = 50;
    offset = 0;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ListAuditLogsDto.prototype, "action", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ListAuditLogsDto.prototype, "targetType", void 0);
__decorate([
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], ListAuditLogsDto.prototype, "targetId", void 0);
__decorate([
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], ListAuditLogsDto.prototype, "actorUserId", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(100),
    __metadata("design:type", Number)
], ListAuditLogsDto.prototype, "limit", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], ListAuditLogsDto.prototype, "offset", void 0);
//# sourceMappingURL=list-audit-logs.dto.js.map