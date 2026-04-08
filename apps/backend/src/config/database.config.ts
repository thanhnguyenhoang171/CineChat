import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { Logger } from '@nestjs/common';

const logger = new Logger('MongoDB');

export const DatabaseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>('MONGODB_URI');
    const maskedUri = uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'UNDEFINED';
    logger.log(`Connecting to MongoDB at: ${maskedUri}`);

    return {
      uri,
      family: 4,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Tăng thời gian chờ server
      connectTimeoutMS: 15000,
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => logger.log('MongoDB connected'));
        connection.on('open', () => logger.log('MongoDB connection open'));
        connection.on('disconnected', () => logger.warn('MongoDB disconnected'));
        connection.on('reconnected', () => logger.log('MongoDB reconnected'));
        connection.on('disconnecting', () => logger.log('MongoDB disconnecting'));
        return connection;
      },
      connectionFactory: (connection: any) => {
        connection.plugin(mongooseDelete, {
          deletedAt: true,
          overrideMethods: 'all',
          deletedBy: true,
          indexFields: 'all',
          deletedByType: String, // Có thể chỉnh type nếu cần
        });
        return connection;
      },
    };
  },
  inject: [ConfigService],
};
