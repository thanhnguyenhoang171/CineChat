import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@common/schemas/base.schema';
import { LocalizedString } from '@common/schemas/localized-string.schema';

@Schema({ timestamps: true })
export class Genre extends BaseSchema {
  @Prop({ type: LocalizedString, required: true })
  name: LocalizedString;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    index: true,
  })
  slug: string;

  @Prop()
  order: number;
}

export type GenreDocument = HydratedDocument<Genre>;
export const GenreSchema = SchemaFactory.createForClass(Genre);
