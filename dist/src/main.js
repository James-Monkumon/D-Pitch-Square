import { ValidationPipe, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';
import { NestFactory, } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter, } from './common/filters/http-exception.filter.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    app.setGlobalPrefix(config.get('API_PREFIX', 'api/v1'));
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(config.get('PORT', 3000));
}
bootstrap();
//# sourceMappingURL=main.js.map