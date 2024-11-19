import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';

@Controller('integrations')
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}

  @Get()
  getHello(){
    return this.appService.getHello();
  }

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
