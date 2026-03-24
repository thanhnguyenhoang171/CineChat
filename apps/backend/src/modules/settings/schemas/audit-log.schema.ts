import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AuditLogDocument = HydratedDocument<AuditLog>;

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, index: true })
  action: string; // e.g., 'CREATE_MOVIE', 'DELETE_USER', 'UPDATE_SETTING'

  @Prop({ required: true, index: true })
  module: string; // e.g., 'MOVIES', 'USERS', 'PAYMENTS'

  @Prop({ type: Object })
  details: any; // Lưu data cũ và data mới (diff)

  @Prop()
  ipAddress: string;

  @Prop()
  userAgent: string;

  @Prop({ type: Date, default: Date.now, expires: '90d' }) // Tự động xóa sau 90 ngày
  createdAt: Date;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
