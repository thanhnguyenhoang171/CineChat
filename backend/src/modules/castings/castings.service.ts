import { Injectable } from '@nestjs/common';
import { CreateCastingDto } from './dto/create-casting.dto';
import { UpdateCastingDto } from './dto/update-casting.dto';

@Injectable()
export class CastingsService {
  create(createCastingDto: CreateCastingDto) {
    return 'This action adds a new casting';
  }

  findAll() {
    return `This action returns all castings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} casting`;
  }

  update(id: number, updateCastingDto: UpdateCastingDto) {
    return `This action updates a #${id} casting`;
  }

  remove(id: number) {
    return `This action removes a #${id} casting`;
  }
}
