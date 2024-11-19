import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from './pipes/validation.pipe';
async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  //enabling sessions
  app.use(session({
    secret: process.env.SECRET_AUTH,
    saveUninitialized: false, // Do not create a session until something is stored
    resave: false, // Session will not be saved if unmodified
    cookie: {
      maxAge: 60000,
      httpOnly: true, 
      secure: false
    }
  }))
  
  //enable passport
  app.use(passport.initialize())
  app.use(passport.session())

  app.enableCors({
    origin: 'http://localhost:3000', // React app URL
  });
  
  const config = new DocumentBuilder()
    .setTitle('BACKEND with Node.js. & Nest js')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Niktar1')
    .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())
    
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();
