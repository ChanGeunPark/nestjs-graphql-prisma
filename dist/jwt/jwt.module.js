"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_constants_1 = require("./jwt.constants");
const jwt_service_1 = require("./jwt.service");
let JwtModule = JwtModule_1 = class JwtModule {
    static forRoot(options) {
        return {
            module: JwtModule_1,
            exports: [jwt_service_1.JwtService],
            providers: [
                {
                    provide: jwt_constants_1.CONFIG_OPTIONS,
                    useValue: options,
                },
                jwt_service_1.JwtService,
            ],
        };
    }
};
JwtModule = JwtModule_1 = __decorate([
    (0, common_1.Module)({}),
    (0, common_1.Global)()
], JwtModule);
exports.JwtModule = JwtModule;
//# sourceMappingURL=jwt.module.js.map