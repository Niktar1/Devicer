import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

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

    
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();
