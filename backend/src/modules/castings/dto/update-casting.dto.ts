import { PartialType } from '@nestjs/swagger';
import { CreateCastingDto } from './create-casting.dto';

export class UpdateCastingDto extends PartialType(CreateCastingDto) {}
