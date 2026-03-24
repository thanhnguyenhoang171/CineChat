import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnalyticsSnapshotDocument = HydratedDocument<AnalyticsSnapshot>;

@Schema({ timestamps: true })
export class AnalyticsSnapshot {
  @Prop({ required: true, unique: true, index: true })
  date: string; // 'YYYY-MM-DD'

  @Prop({ default: 0 })
  totalRevenue: number;

  @Prop({ default: 0 })
  newUsersCount: number;

  @Prop({ default: 0 })
  activeUsersCount: number;

  @Prop({ default: 0 })
  totalViews: number;

  @Prop({ type: Object })
  topMovies: { movieId: string; title: string; views: number }[];

  @Prop({ type: Object })
  subscriptionStats: { planName: string; count: number }[];
}

export const AnalyticsSnapshotSchema = SchemaFactory.createForClass(AnalyticsSnapshot);
