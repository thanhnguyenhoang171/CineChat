import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  // =============== QUEUE OPERATIONS ===============

  /**
   * Thêm job vào queue
   * @param queueName Tên queue
   * @param data Dữ liệu job
   * @returns Job ID
   */
  async addJob(queueName: string, data: any): Promise<string> {
    const jobId = `job:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    const jobPayload = JSON.stringify({
      id: jobId,
      data,
      timestamp: Date.now(),
      status: 'queued',
    });

    // LPUSH: thêm vào đầu queue (FIFO)
    await this.redisClient.lpush(`queue:${queueName}`, jobPayload);

    // Publish event cho real-time monitoring
    await this.redisClient.publish(
      `queue:${queueName}:events`,
      JSON.stringify({
        type: 'job_added',
        jobId,
        queueName,
        timestamp: Date.now(),
      }),
    );

    return jobId;
  }

  /**
   * Thêm job với priority
   */
  async addJobWithPriority(
    queueName: string,
    data: any,
    priority: 'high' | 'normal' | 'low' = 'normal',
  ): Promise<string> {
    const jobId = `job:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    const jobPayload = JSON.stringify({
      id: jobId,
      data,
      priority,
      timestamp: Date.now(),
      status: 'queued',
    });

    // Queue riêng cho từng priority
    const queueKey = `queue:${queueName}:${priority}`;
    await this.redisClient.lpush(queueKey, jobPayload);

    return jobId;
  }

  /**
   * Thêm job với delay (scheduled job)
   */
  async addDelayedJob(queueName: string, data: any, delayMs: number): Promise<string> {
    const jobId = `job:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    const jobPayload = JSON.stringify({
      id: jobId,
      data,
      timestamp: Date.now(),
      delayUntil: Date.now() + delayMs,
    });

    // Lưu vào sorted set với score là thời điểm chạy
    await this.redisClient.zadd(`delayed:${queueName}`, Date.now() + delayMs, jobPayload);

    return jobId;
  }

  // =============== QUEUE MANAGEMENT ===============

  /**
   * Lấy số lượng jobs trong queue
   */
  async getQueueLength(queueName: string, priority?: string): Promise<number> {
    const queueKey = priority ? `queue:${queueName}:${priority}` : `queue:${queueName}`;

    return await this.redisClient.llen(queueKey);
  }

  /**
   * Lấy tất cả queues và số lượng jobs
   */
  async getAllQueues(): Promise<Record<string, any>> {
    const keys = await this.redisClient.keys('queue:*');
    const result: Record<string, any> = {};

    for (const key of keys) {
      const length = await this.redisClient.llen(key);
      const queueName = key.replace('queue:', '');
      result[queueName] = {
        length,
        memory: await this.redisClient.memory('USAGE', key),
      };
    }

    return result;
  }

  /**
   * Xóa tất cả jobs trong queue (debug only)
   */
  async clearQueue(queueName: string): Promise<void> {
    const priorities = ['high', 'normal', 'low'];

    for (const priority of priorities) {
      const queueKey = `queue:${queueName}:${priority}`;
      await this.redisClient.del(queueKey);
    }

    // Xóa delayed jobs
    await this.redisClient.del(`delayed:${queueName}`);
  }

  // =============== HEALTH CHECK ===============

  /**
   * Kiểm tra kết nối Redis
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.redisClient.ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Lấy thông tin Redis
   */
  async getRedisInfo(): Promise<any> {
    const info = await this.redisClient.info();
    const parsedInfo: Record<string, string> = {};

    info.split('\r\n').forEach((line) => {
      const [key, value] = line.split(':');
      if (key && value) {
        parsedInfo[key] = value;
      }
    });

    return {
      version: parsedInfo['redis_version'],
      uptime: parsedInfo['uptime_in_seconds'],
      memory: {
        used: parsedInfo['used_memory_human'],
        peak: parsedInfo['used_memory_peak_human'],
      },
      connections: parsedInfo['connected_clients'],
    };
  }

  // =============== PUB/SUB ===============

  /**
   * Publish message đến channel
   */
  async publish(channel: string, message: any): Promise<number> {
    return await this.redisClient.publish(channel, JSON.stringify(message));
  }

  /**
   * Subscribe vào channel
   */
  async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    this.redisClient.subscribe(channel);
    this.redisClient.on('message', (chn, msg) => {
      if (chn === channel) {
        callback(JSON.parse(msg));
      }
    });
  }

  // =============== UTILITY METHODS ===============

  /**
   * Đặt key-value với TTL
   */
  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const stringValue = JSON.stringify(value);

    if (ttlSeconds) {
      await this.redisClient.setex(key, ttlSeconds, stringValue);
    } else {
      await this.redisClient.set(key, stringValue);
    }
  }

  /**
   * Lấy giá trị từ key
   */
  async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Xóa key
   */
  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
