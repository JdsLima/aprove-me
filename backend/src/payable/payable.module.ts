import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { PayableRepository } from './payable.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PayableController],
  providers: [PayableService, PayableRepository],
})
export class PayableModule {}
