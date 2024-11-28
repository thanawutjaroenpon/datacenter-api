import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
// import { AllExceptionsFilter } from './common/interceptor/http-exception.filter';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [
      { method: RequestMethod.GET, path: '/' }
    ]
  });
  
  app.useGlobalPipes(new ValidationPipe());

  // const httpAdapterHost  = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('UPOS API')
    // .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const options: SwaggerCustomOptions = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      persistAuthorization: true
    }
  };
  SwaggerModule.setup('swagger', app, document, options);

  const OpenApiSpecification =
    app.use(
      '/reference',
      apiReference({
        spec: {
          content: document,
        },
      }),
    )

  await app.listen(process.env.APP_PORT, '0.0.0.0');

  const logger = new Logger('bootstrap');
  logger.log(`Listening on ${await app.getUrl()}`);
}
bootstrap();
