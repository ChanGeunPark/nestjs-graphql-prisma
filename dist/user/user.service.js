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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ email, password, role, }) {
        try {
            const exists = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (exists) {
                return { ok: false, error: 'There is a user with that email already' };
            }
            const hashPassword = await bcrypt.hash(password, 10);
            await this.prisma.user.create({
                data: {
                    email,
                    password: hashPassword,
                    role,
                },
            });
            return { ok: true };
        }
        catch (e) {
            return { ok: false, error: "Couldn't create account" };
        }
    }
    async login({ email, password, }) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                return {
                    ok: false,
                    error: 'User not found',
                };
            }
            const passwordCurrent = await bcrypt.compare(password, user.password);
            if (!passwordCurrent) {
                return {
                    ok: false,
                    error: 'Wrong password',
                };
            }
            return {
                ok: true,
                token: 'asdfasdf',
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserInput) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map