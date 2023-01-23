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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleWare = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_service_1 = require("./jwt.service");
let JwtMiddleWare = class JwtMiddleWare {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async use(req, res, nest) {
        if ('x-jwt' in req.headers) {
            const token = req.headers['x-jwt'];
            const decoded = this.jwtService.verify(token.toString());
            if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                try {
                    const user = await this.userService.findById(decoded['id']);
                    req['user'] = user;
                }
                catch (e) { }
            }
        }
        nest();
    }
};
JwtMiddleWare = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        user_service_1.UserService])
], JwtMiddleWare);
exports.JwtMiddleWare = JwtMiddleWare;
//# sourceMappingURL=jwt.middleware.js.map