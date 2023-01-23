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
const jwt_service_1 = require("../jwt/jwt.service");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    constructor(prisma, jwtService, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailService = mailService;
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
            const user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashPassword,
                    role,
                },
            });
            const verification = await this.prisma.verification.create({
                data: {
                    code: (0, uuid_1.v4)().replace(/-/g, ''),
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });
            this.mailService.sendVerificationEmail(user.email, verification.code);
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
            const token = this.jwtService.sign(user.id);
            return {
                ok: true,
                token,
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
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async findById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id,
                },
            });
            if (user) {
                return {
                    ok: true,
                    user,
                };
            }
        }
        catch (error) {
            return { ok: false, error: 'User not found' };
        }
    }
    async editProfile(userId, editProfileInput) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (user && user.email !== editProfileInput.email) {
                const hashPassword = await bcrypt.hash(editProfileInput.password, 10);
                const verification = await this.prisma.verification.create({
                    data: {
                        code: (0, uuid_1.v4)().replace(/-/g, ''),
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                    },
                });
                this.mailService.sendVerificationEmail(user.email, verification.code);
                await this.prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        email: editProfileInput.email,
                        password: editProfileInput.password ? hashPassword : user.password,
                    },
                });
            }
            else {
                throw Error();
            }
            return { ok: true };
        }
        catch (e) {
            return {
                ok: false,
                error: "Couldn't update profile",
            };
        }
    }
    async verifyEmail(code) {
        const verification = await this.prisma.verification.findFirst({
            where: {
                code,
            },
            include: {
                user: true,
            },
        });
        try {
            if (verification) {
                await this.prisma.user.update({
                    where: {
                        id: verification.user.id,
                    },
                    data: {
                        verified: true,
                    },
                });
                await this.prisma.verification.delete({
                    where: {
                        id: verification.id,
                    },
                });
                return {
                    ok: true,
                };
            }
            return { ok: false, error: 'Verification not found' };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_service_1.JwtService,
        mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map