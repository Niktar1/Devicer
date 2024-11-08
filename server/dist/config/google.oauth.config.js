"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("googleOAuth", () => ({
    clientID: "567805941769-r73dnesj1j77np6fsv0vbgvr9mqpm3k1.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/cb"
}));
//# sourceMappingURL=google.oauth.config.js.map