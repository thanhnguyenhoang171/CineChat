import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ timestamps: true })
export class Genre extends BaseSchema {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ unique: true, trim: true })
  slug: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
