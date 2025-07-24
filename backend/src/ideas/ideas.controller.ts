import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IsString, IsNotEmpty } from 'class-validator';

class CreateIdeaDto {
  @IsNotEmpty()
  @IsString()
  idea: string;
}

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  async create(@Body() createIdeaDto: CreateIdeaDto) {
    
    return this.ideasService.create(createIdeaDto.idea);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.ideasService.findById(id);
  }
}
