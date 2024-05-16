import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService, PrismaService],
  imports: [PrismaModule],
})
export class EmpresasModule {
}
