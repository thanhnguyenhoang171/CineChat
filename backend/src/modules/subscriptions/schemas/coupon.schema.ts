import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class Coupon extends BaseSchema {
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  code: string;

  @Prop({ required: true, enum: ['PERCENTAGE', 'FIXED'] })
  discountType: string;

  @Prop({ required: true })
  discountValue: number;

  @Prop({ default: 0 })
  maxUsage: number; // 0 là không giới hạn

  @Prop({ default: 0 })
  usedCount: number;

  @Prop()
  expiryDate: Date;

  @Prop({ type: [String] })
  applicablePlans: string[]; // ID của các gói được áp dụng

  @Prop({ default: 0 })
  minOrderAmount: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
