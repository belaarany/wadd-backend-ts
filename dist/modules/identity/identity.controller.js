"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const identity_service_1 = require("../../microservices/identity/identity.service");
const CommonResponse_service_1 = require("../../shared/CommonResponse.service");
const identity_dto_1 = require("./identity.dto");
const identity_service_2 = require("./identity.service");
let IdentityController = class IdentityController {
    constructor(res, identityService) {
        this.res = res;
        this.identityService = identityService;
    }
    async register(registerDto) {
        let user = await this.identityService.register();
        return this.res.create({
            uuid: user.id,
        });
    }
};
__decorate([
    common_1.Post("register"),
    swagger_1.ApiCreatedResponse({ type: identity_dto_1.RegisterResponse }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [identity_dto_1.RegisterRequest]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "register", null);
IdentityController = __decorate([
    swagger_1.ApiTags('Identity'),
    common_1.Controller("identity"),
    __metadata("design:paramtypes", [CommonResponse_service_1.CommonResponseFactory,
        identity_service_2.IdentityService])
], IdentityController);
exports.IdentityController = IdentityController;
//# sourceMappingURL=identity.controller.js.map