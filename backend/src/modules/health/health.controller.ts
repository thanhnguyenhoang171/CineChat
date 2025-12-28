import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RedisService } from 'redis/redis.service';
import { JwtPublic } from '@common/decorators/auth.decorator';

@ApiTags('Health')
@Controller('health')
@JwtPublic()
export class HealthController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  @ApiOperation({ summary: 'Health check API' })
  async healthCheck() {
    const redisHealth = await this.redisService.healthCheck();
    const redisInfo = await this.redisService.getRedisInfo();
    const queueStats = await this.redisService.getAllQueues();

    return {
      status: redisHealth ? 'healthy' : 'unhealthy',
      timestamp: new Date(),
      services: {
        redis: redisHealth ? 'connected' : 'disconnected',
        api: 'running',
      },
      redis: redisInfo,
      queues: queueStats,
      uptime: process.uptime(),
    };
  }

  @Get('redis')
  @ApiOperation({ summary: 'Redis health check' })
  async redisHealth() {
    const isHealthy = await this.redisService.healthCheck();

    return {
      service: 'redis',
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date(),
    };
  }
}
