import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema({ timestamps: true })
export class Feedback extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, enum: ['BUG', 'FEATURE', 'PAYMENT', 'OTHER'], index: true })
  type: string;

  @Prop({ required: true, trim: true })
  subject: string;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ default: 'PENDING', enum: ['PENDING', 'PROCESSING', 'RESOLVED'], index: true })
  status: string;

  @Prop()
  adminNote: string; // Ghi chú của Admin khi xử lý feedback
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
