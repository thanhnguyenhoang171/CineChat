import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, index: true })
  movieId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, min: 1, max: 10 })
  rating: number;

  @Prop({ trim: true })
  content: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: mongoose.Schema.Types.ObjectId[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
ReviewSchema.index({ userId: 1, movieId: 1 }, { unique: true }); // Mỗi user review 1 phim 1 lần
