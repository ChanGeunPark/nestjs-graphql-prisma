"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("./prisma/prisma.service");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const jwt_module_1 = require("./jwt/jwt.module");
const Joi = require("joi");
const jwt_middleware_1 = require("./jwt/jwt.middleware");
const apollo_server_core_1 = require("apollo-server-core");
const mail_module_1 = require("./mail/mail.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(jwt_middleware_1.JwtMiddleWare).forRoutes({
            path: '/graphql',
            method: common_1.RequestMethod.POST,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
                ignoreEnvFile: process.env.NODE_ENV === 'prod',
                validationSchema: Joi.object({
                    DATABASE_URL: Joi.string().required(),
                    PRIVATE_KEY: Joi.string().required(),
                    MAIL_API_KEY: Joi.string().required(),
                    MAIL_DOMAIN_NAME: Joi.string().required(),
                    MAIL_FROM_EMAIL: Joi.string().required(),
                }),
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                playground: false,
                autoSchemaFile: true,
                plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)()],
                context: ({ req }) => ({ user: req['user'] }),
            }),
            jwt_module_1.JwtModule.forRoot({
                privateKey: process.env.PRIVATE_KEY,
            }),
            user_module_1.UserModule,
            mail_module_1.MailModule.forRoot({
                apiKey: process.env.MAIL_API_KEY,
                domain: process.env.MAIL_DOMAIN_NAME,
                fromEmail: process.env.MAIL_FROM_EMAIL,
            }),
        ],
        controllers: [],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map