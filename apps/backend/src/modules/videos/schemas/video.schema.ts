import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@common/schemas/base.schema';
import { LocalizedString } from '@common/schemas/localized-string.schema';
import { Movie } from '@modules/movies/schemas/movie.schema';

@Schema({ timestamps: true })
export class Video extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Movie.name })
  movieId: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    index: true,
  })
  key: string; // key for to get video

  @Prop()
  publishedAt: Date;
}

export type VideoDocument = HydratedDocument<Video>;
export const VideoSchema = SchemaFactory.createForClass(Video);
