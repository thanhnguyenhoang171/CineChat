import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

export type WatchHistoryDocument = HydratedDocument<WatchHistory>;

@Schema({ timestamps: true })
export class WatchHistory extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, index: true })
  movieId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 0 })
  watchedSeconds: number;

  @Prop({ default: 0 })
  totalSeconds: number;

  @Prop({ default: 0 })
  completionRate: number; // % hoàn thành phim

  @Prop({ default: Date.now })
  lastWatchedAt: Date;
}

export const WatchHistorySchema = SchemaFactory.createForClass(WatchHistory);
WatchHistorySchema.index({ userId: 1, movieId: 1 }, { unique: true });
