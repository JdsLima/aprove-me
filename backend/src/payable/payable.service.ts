import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableRepository } from './payable.repository';

@Injectable()
export class PayableService {
  constructor(private payableRepository: PayableRepository) {}

  create(createPayableDto: CreatePayableDto) {
    return this.payableRepository.create(createPayableDto);
  }

  findAll() {
    return this.payableRepository.findAll();
  }

  findOne(id: string) {
    return this.payableRepository.findOne(id);
  }

  update(id: string, updatePayableDto: UpdatePayableDto) {
    return this.payableRepository.update(id, updatePayableDto);
  }

  remove(id: string) {
    return this.payableRepository.remove(id);
  }
}
