import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea, IdeaDocument } from './idea.schema';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class IdeasService {
  constructor(
    @InjectModel(Idea.name) private ideaModel: Model<IdeaDocument>,
  ) {}

  async create(idea: string): Promise<Idea> {
    // Generate dummy sections
    const sections = ['Hero', 'About', 'Contact'];
    const created = new this.ideaModel({ idea, sections });
    return created.save();
  }

  async findById(id: string): Promise<Idea> {
    if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid ID format');
      }
    const found = await this.ideaModel.findById(id).exec();
    if (!found) throw new NotFoundException('Idea not found');
    return found;
  }
}
