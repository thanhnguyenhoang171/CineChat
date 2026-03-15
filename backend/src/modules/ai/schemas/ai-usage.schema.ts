import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AIUsageDocument = HydratedDocument<AIUsage>;

@Schema({ timestamps: true })
export class AIUsage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, enum: ['CHAT', 'ANALYSIS', 'SUMMARY'], index: true })
  aiType: string;

  @Prop({ default: 0 })
  tokensUsed: number;

  @Prop({ default: 1 })
  requestCount: number;

  @Prop({ required: true, index: true })
  date: string; // Định dạng 'YYYY-MM-DD' để dễ dàng reset lượt dùng theo ngày
}

export const AIUsageSchema = SchemaFactory.createForClass(AIUsage);
AIUsageSchema.index({ userId: 1, aiType: 1, date: 1 }, { unique: true });
