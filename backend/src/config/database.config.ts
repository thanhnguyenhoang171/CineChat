import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Logger } from '@nestjs/common';

const logger = new Logger('MongoDB');

export const DatabaseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
    onConnectionCreate: (connection: Connection) => {
     connection.on('connected', () => logger.log('MongoDB connected'));
     connection.on('open', () => logger.log('MongoDB connection open'));
     connection.on('disconnected', () => logger.warn('MongoDB disconnected'));
     connection.on('reconnected', () => logger.log('MongoDB reconnected'));
     connection.on('disconnecting', () => logger.log('MongoDB disconnecting'));
     return connection;
    },
    connectionFactory: (connection) => {
      connection.plugin(softDeletePlugin);
      return connection;
    },
  }),
  inject: [ConfigService],
};
