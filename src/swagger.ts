import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function initSwagger(app) {
	const config = new DocumentBuilder()
		.setTitle('Wadd - API Gateway')
		.setVersion('0.1')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document)
}

export { initSwagger }
