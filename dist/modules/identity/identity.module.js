"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const identity_service_1 = require("./identity.service");
const identity_controller_1 = require("./identity.controller");
const CommonResponse_module_1 = require("../../shared/CommonResponse.module");
const identity_module_1 = require("../../microservices/identity/identity.module");
const identity_service_2 = require("../../microservices/identity/identity.service");
let IdentityModule = class IdentityModule {
};
IdentityModule = __decorate([
    common_1.Module({
        imports: [identity_module_1.IdentityMicroserviceModule, CommonResponse_module_1.CommonResponseModule],
        controllers: [identity_controller_1.IdentityController],
        providers: [identity_service_1.IdentityService],
        exports: [],
    })
], IdentityModule);
exports.IdentityModule = IdentityModule;
//# sourceMappingURL=identity.module.js.map