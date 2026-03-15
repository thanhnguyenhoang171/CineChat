import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class UserSubscription extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true })
  planId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true, index: true })
  endDate: Date;

  @Prop({ default: true })
  autoRenew: boolean;

  @Prop({ default: 'ACTIVE', enum: ['ACTIVE', 'EXPIRED', 'CANCELED'] })
  status: string;
}

export const UserSubscriptionSchema = SchemaFactory.createForClass(UserSubscription);
