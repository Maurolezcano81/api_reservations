import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoursAttentionService } from './hours-attention.service';
import { CreateHoursAttentionDto } from './dto/create-hours-attention.dto';
import { UpdateHoursAttentionDto } from './dto/update-hours-attention.dto';

@Controller('hours-attention')
export class HoursAttentionController {
  constructor(private readonly hoursAttentionService: HoursAttentionService) {}

  @Post()
  create(@Body() createHoursAttentionDto: CreateHoursAttentionDto) {
    console.log(createHoursAttentionDto)
    return this.hoursAttentionService.create(createHoursAttentionDto);
  }
 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHoursAttentionDto: UpdateHoursAttentionDto) {
    return this.hoursAttentionService.update(+id, updateHoursAttentionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoursAttentionService.remove(+id);
  }



   // @Get()
  // findAll() {
  //   return this.hoursAttentionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.hoursAttentionService.findOne(+id);
  // }

}
