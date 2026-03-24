import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class SubscriptionPlan extends BaseSchema {
  @Prop({ required: true, unique: true, trim: true })
  name: string; // Free, Premium, VIP

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  durationDays: number;

  @Prop({ type: [String], default: [] })
  features: string[]; // ['AI_CHAT', '4K_WATCHING', 'NO_ADS']

  @Prop({ default: 0 })
  priority: number; // Để so sánh cấp độ gói khi nâng cấp
}

export const SubscriptionPlanSchema = SchemaFactory.createForClass(SubscriptionPlan);
