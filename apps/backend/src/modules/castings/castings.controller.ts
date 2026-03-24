import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CastingsService } from './castings.service';
import { CreateCastingDto } from './dto/create-casting.dto';
import { UpdateCastingDto } from './dto/update-casting.dto';

@Controller('castings')
export class CastingsController {
  constructor(private readonly castingsService: CastingsService) {}

  @Post()
  create(@Body() createCastingDto: CreateCastingDto) {
    return this.castingsService.create(createCastingDto);
  }

  @Get()
  findAll() {
    return this.castingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.castingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCastingDto: UpdateCastingDto) {
    return this.castingsService.update(+id, updateCastingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.castingsService.remove(+id);
  }
}
