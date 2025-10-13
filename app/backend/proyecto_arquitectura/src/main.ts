import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Debug: Verificar variables de entorno
  console.log('🔧 JWT_SECRET cargado:', process.env.JWT_SECRET ? 'SÍ ✅' : 'NO ❌');
  console.log('🔧 DB_PORT:', process.env.DB_PORT);
  console.log('🔧 BACKEND_PORT:', process.env.BACKEND_PORT);
  
  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002'],
    credentials: true,
  });
  
  app.setGlobalPrefix('deno');
  await app.listen(process.env.BACKEND_PORT || process.env.PORT || 3000);
  
  console.log(`🚀 Backend corriendo en http://localhost:${process.env.BACKEND_PORT || 3000}/deno`);
}
bootstrap();
