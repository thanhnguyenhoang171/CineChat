import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class ChatSession extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 'Cuộc hội thoại mới' })
  title: string;
}

export const ChatSessionSchema = SchemaFactory.createForClass(ChatSession);

@Schema({ timestamps: true })
export class ChatMessage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ChatSession', required: true, index: true })
  sessionId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, enum: ['user', 'assistant'] })
  role: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movieMentions: mongoose.Schema.Types.ObjectId[]; // Các phim AI nhắc tới
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
