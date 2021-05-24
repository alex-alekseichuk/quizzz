import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAdminPanel } from './admin-panel/admin-panel.plugin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupAdminPanel(app);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
