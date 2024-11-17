import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { AssignorRepository } from './assignor.repository';
import { PrismaModule } from '../database/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository],
})
export class AssignorModule {}
