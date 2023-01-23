"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../common/common.constants");
const mail_service_1 = require("./mail.service");
let MailModule = MailModule_1 = class MailModule {
    static forRoot(options) {
        return {
            module: MailModule_1,
            exports: [mail_service_1.MailService],
            providers: [
                {
                    provide: common_constants_1.CONFIG_OPTIONS,
                    useValue: options,
                },
                mail_service_1.MailService,
            ],
        };
    }
};
MailModule = MailModule_1 = __decorate([
    (0, common_1.Module)({}),
    (0, common_1.Global)()
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map