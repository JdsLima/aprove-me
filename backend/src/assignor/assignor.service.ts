import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AssignorRepository } from './assignor.repository';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}
  async create(createAssignorDto: CreateAssignorDto) {
    return this.assignorRepository.create(createAssignorDto);
  }

  async findAll() {
    return this.assignorRepository.findAll();
  }

  async findOne(id: string) {
    return this.assignorRepository.findOne(id);
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return this.assignorRepository.update(id, updateAssignorDto);
  }

  async remove(id: string) {
    return this.assignorRepository.remove(id);
  }
}
