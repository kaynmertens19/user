"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typebox_1 = require("@sinclair/typebox");
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_errors_1 = __importDefault(require("ajv-errors"));
const dto_types_1 = require("../lib/dto-types");
const RegisterDTOSchema = typebox_1.Type.Object({
    _id: dto_types_1.idDTOSchema,
    name: dto_types_1.nameDTOSchema,
    surname: dto_types_1.surnameDTOSchema,
    email: dto_types_1.emailDTOSchema,
    password: dto_types_1.passwordDTOSchema,
}, {
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "Format not valid"
    }
});
const ajv = new ajv_1.default({ allErrors: true });
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
(0, ajv_formats_1.default)(ajv, ["email", "uuid"]).addKeyword("kind").addKeyword("modifier");
(0, ajv_errors_1.default)(ajv);
const validateSchema = ajv.compile(RegisterDTOSchema);
const userRegisterDTO = (req, res, next) => {
    var _a;
    const isDTOValid = validateSchema(req.body);
    if (!isDTOValid) {
        return res.status(400).send({ errors: (_a = validateSchema.errors) === null || _a === void 0 ? void 0 : _a.map((error) => error.message) });
    }
    next();
};
exports.default = userRegisterDTO;
