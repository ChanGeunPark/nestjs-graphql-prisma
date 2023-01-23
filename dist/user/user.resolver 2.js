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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entities/user.entity");
const create_user_input_1 = require("./dto/create-user.input");
const login_dto_1 = require("./dto/login.dto");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const user_profile_dto_1 = require("./dto/user-profile.dto");
const edit_profile_dto_1 = require("./dto/edit-profile.dto");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserInput) {
        try {
            return await this.userService.create(createUserInput);
        }
        catch (e) {
            return {
                error: e,
                ok: false,
            };
        }
    }
    async login(loginInput) {
        try {
            return await this.userService.login(loginInput);
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    me(authUser) {
        return authUser;
    }
    async userProfile(userProfileInput) {
        try {
            const user = await this.userService.findById(userProfileInput.userId);
            if (!user) {
                throw Error();
            }
            return {
                ok: Boolean(user),
                user,
            };
        }
        catch (e) {
            return {
                error: 'User Not Found',
                ok: false,
            };
        }
    }
    async editProfile(authUser, editProfileInput) {
        try {
            return await this.userService.editProfile(authUser.id, editProfileInput);
        }
        catch (e) {
            return {
                error: e,
                ok: false,
            };
        }
    }
    removeUser(id) {
        return this.userService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => create_user_input_1.CreateUserOutput),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => login_dto_1.LoginOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'user' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Query)(() => user_profile_dto_1.UserProfileOutput),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_profile_dto_1.UserProfileInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Mutation)(() => edit_profile_dto_1.EditProfileOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        edit_profile_dto_1.EditProfileInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "editProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "removeUser", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)((of) => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map