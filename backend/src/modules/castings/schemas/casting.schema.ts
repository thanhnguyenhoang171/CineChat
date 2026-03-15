import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ActiveStatus, MovieDepartment } from '@common/constants/common-constant';
import { Cast } from '@modules/casts/schemas/cast.schema';
import { Movie } from '@modules/movies/schemas/movie.schema';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class Casting extends BaseSchema{
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Cast.name })
  castId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Movie.name })
  movieId: mongoose.Schema.Types.ObjectId;

  @Prop()
  character: string;

  @Prop({
    type: String,
    enum: MovieDepartment,
  })
  knownForDepartment: MovieDepartment;

  @Prop()
  order: number;
}

export type CastingDocument = HydratedDocument<Casting>;
export const CastingSchema = SchemaFactory.createForClass(Casting);
