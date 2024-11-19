"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExeption = void 0;
const common_1 = require("@nestjs/common");
class ValidationExeption extends common_1.HttpException {
    constructor(response) {
        super(response, common_1.HttpStatus.BAD_REQUEST);
        this.message = response;
    }
}
exports.ValidationExeption = ValidationExeption;
//# sourceMappingURL=validation.exeption.js.map