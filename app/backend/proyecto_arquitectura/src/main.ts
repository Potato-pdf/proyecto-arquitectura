import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002'],
    credentials: true,
  });
  
  app.setGlobalPrefix('deno');
  await app.listen(process.env.BACKEND_PORT || process.env.PORT || 3000);
}
bootstrap();
