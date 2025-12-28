// import { Injectable, Logger } from '@nestjs/common';
// import { RedisService } from '../redis/redis.service';

// export interface VideoJobData {
//   videoId: string;
//   userId: string;
//   filePath: string;
//   originalName: string;
//   targetQualities: string[];
// }

// export interface EmailJobData {
//   to: string;
//   subject: string;
//   template: string;
//   context: Record<string, any>;
// }

// export interface AnalyticsJobData {
//   userId: string;
//   movieId: string;
//   action: 'play' | 'pause' | 'stop' | 'seek';
//   timestamp: Date;
//   duration?: number;
// }

// @Injectable()
// export class QueueService {
//   private readonly logger = new Logger(QueueService.name);

//   constructor(private readonly redisService: RedisService) {}

//   // =============== VIDEO QUEUE ===============

//   async addVideoTranscodeJob(data: VideoJobData): Promise<string> {
//     this.logger.log(`Adding video transcode job: ${data.videoId}`);

//     const jobId = await this.redisService.addJobWithPriority(
//       'video-processing',
//       {
//         type: 'transcode',
//         ...data,
//       },
//       'high', // Priority cao cho video processing
//     );

//     // Log event
//     await this.redisService.publish('system:events', {
//       type: 'video_job_added',
//       jobId,
//       videoId: data.videoId,
//       timestamp: new Date(),
//     });

//     return jobId;
//   }

//   async addThumbnailJob(data: VideoJobData): Promise<string> {
//     return await this.redisService.addJobWithPriority(
//       'video-processing',
//       {
//         type: 'thumbnail',
//         ...data,
//       },
//       'normal',
//     );
//   }

//   // =============== EMAIL QUEUE ===============

//   async addWelcomeEmail(email: string, name: string): Promise<string> {
//     return await this.redisService.addJob('email', {
//       type: 'welcome',
//       to: email,
//       subject: 'Welcome to Netflix Clone! 🎬',
//       template: 'welcome',
//       context: { name },
//     } as EmailJobData);
//   }

//   async addNotificationEmail(email: string, movieTitle: string, episode?: number): Promise<string> {
//     const jobData: EmailJobData = {
//       to: email,
//       subject: episode
//         ? `New episode available: ${movieTitle} - Episode ${episode}`
//         : `New movie available: ${movieTitle}`,
//       template: 'notification',
//       context: { movieTitle, episode },
//     };

//     return await this.redisService.addJob('email', jobData);
//   }

//   // =============== ANALYTICS QUEUE ===============

//   async trackWatchEvent(data: AnalyticsJobData): Promise<string> {
//     return await this.redisService.addJob('analytics', data);
//   }

//   async trackSearchEvent(userId: string, query: string, results: number): Promise<string> {
//     return await this.redisService.addJob('analytics', {
//       userId,
//       action: 'search',
//       query,
//       results,
//       timestamp: new Date(),
//     });
//   }

//   // =============== QUEUE MANAGEMENT ===============

//   async getQueueStats(): Promise<any> {
//     const queues = ['video-processing', 'email', 'analytics', 'thumbnail'];
//     const stats: any = {};

//     for (const queue of queues) {
//       stats[queue] = {
//         high: await this.redisService.getQueueLength(queue, 'high'),
//         normal: await this.redisService.getQueueLength(queue, 'normal'),
//         low: await this.redisService.getQueueLength(queue, 'low'),
//         total: await this.redisService.getQueueLength(queue),
//       };
//     }

//     return {
//       stats,
//       timestamp: new Date(),
//       redis: await this.redisService.getRedisInfo(),
//     };
//   }

//   async clearAllQueues(): Promise<void> {
//     const queues = ['video-processing', 'email', 'analytics', 'thumbnail'];

//     for (const queue of queues) {
//       await this.redisService.clearQueue(queue);
//       this.logger.warn(`Cleared queue: ${queue}`);
//     }
//   }
// }
