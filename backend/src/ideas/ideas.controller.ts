import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IdeasService } from './ideas.service';

class CreateIdeaDto {
  idea: string;
}

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  async create(@Body() createIdeaDto: CreateIdeaDto) {
    if (!createIdeaDto.idea) {
      throw new HttpException('Idea is required', HttpStatus.BAD_REQUEST);
    }
    return this.ideasService.create(createIdeaDto.idea);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.ideasService.findById(id);
  }
}
