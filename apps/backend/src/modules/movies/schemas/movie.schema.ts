import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from '@common/schemas/base.schema';
import { Genre } from './genre.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie extends BaseSchema {
  @Prop({ required: true, trim: true, index: true })
  title: string;

  @Prop({ required: true, unique: true, trim: true, index: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  poster: {
    url: string;
    publicId: string;
    folder?: string;
  };

  @Prop()
  trailerUrl: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genres: Genre[];

  @Prop({ default: 0 })
  duration: number; // Phút

  @Prop()
  releaseDate: Date;

  // --- AI FIELDS ---
  @Prop()
  aiSummary: string; // Tóm tắt do AI viết

  @Prop()
  aiAnalysis: string; // Phân tích chuyên sâu (diễn xuất, ý nghĩa...)

  @Prop({ type: [Number], index: '2d_sphere' }) // Dùng cho Vector Search sau này
  embeddings: number[];

  // --- STATS ---
  @Prop({ default: 0 })
  ratingAverage: number;

  @Prop({ default: 0, index: true })
  ratingCount: number;

  @Prop({ default: 0, index: true })
  viewCount: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
MovieSchema.index({ title: 'text', description: 'text' }); // Search thường bằng text
