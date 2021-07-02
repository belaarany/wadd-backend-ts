"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function initSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Wadd - API Gateway')
        .setVersion('0.1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
}
exports.initSwagger = initSwagger;
//# sourceMappingURL=swagger.js.map