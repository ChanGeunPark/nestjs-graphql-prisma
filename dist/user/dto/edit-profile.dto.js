"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileInput = exports.EditProfileOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const create_user_input_1 = require("./create-user.input");
let EditProfileOutput = class EditProfileOutput extends output_dto_1.CoreOutput {
};
EditProfileOutput = __decorate([
    (0, graphql_1.ObjectType)()
], EditProfileOutput);
exports.EditProfileOutput = EditProfileOutput;
let EditProfileInput = class EditProfileInput extends (0, graphql_1.PartialType)(create_user_input_1.CreateUserInput) {
};
EditProfileInput = __decorate([
    (0, graphql_1.InputType)()
], EditProfileInput);
exports.EditProfileInput = EditProfileInput;
//# sourceMappingURL=edit-profile.dto.js.map