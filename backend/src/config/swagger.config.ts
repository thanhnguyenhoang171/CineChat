import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Cinema with AI')
    .setDescription('Cinema combined with AI project API documentation')
    .setVersion('1.0')
    // 1. Config cho Access Token (Bearer)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'jwt', // Tên này dùng để gán vào @ApiBearerAuth('jwt') trong Controller
    )
    // 2. (Tùy chọn) Thêm hiển thị Cookie Auth để document rõ ràng hơn
    // Lưu ý: httpOnly cookie không nhập tay được, cái này chỉ để hiện icon ổ khóa cho đẹp
    .addCookieAuth('refresh_token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Giữ token khi F5
      withCredentials: true,      // <--- QUAN TRỌNG NHẤT: Bắt Swagger gửi Cookie đi
    },
  });
}