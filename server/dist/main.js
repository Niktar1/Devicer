"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const session = require("express-session");
const passport = require("passport");
const validation_pipe_1 = require("./pipes/validation.pipe");
async function start() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT || 5000;
    app.use(session({
        secret: process.env.SECRET_AUTH,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000,
            httpOnly: true,
            secure: false
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.enableCors({
        origin: 'http://localhost:3000',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('BACKEND with Node.js. & Nest js')
        .setDescription('REST API Documentation')
        .setVersion('1.0.0')
        .addTag('Niktar1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map