import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class LocalizedString {
  @Prop({ required: true, trim: true })
  vi: string;

  @Prop({ required: true, trim: true })
  en: string;
}
