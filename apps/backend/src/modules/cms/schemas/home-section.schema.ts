import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class HomeSection extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: ['SLIDER', 'GRID', 'LIST'] })
  type: string;

  @Prop({ required: true, enum: ['TRENDING', 'LATEST', 'GENRE', 'MANUAL'] })
  dataSource: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' })
  genreId: mongoose.Schema.Types.ObjectId; // Nếu source là GENRE

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  manualMovies: mongoose.Schema.Types.ObjectId[]; // Nếu source là MANUAL

  @Prop({ default: 0 })
  order: number;
}

export const HomeSectionSchema = SchemaFactory.createForClass(HomeSection);
