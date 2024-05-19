import { Module } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimosController } from './emprestimos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmprestimosController],
  providers: [EmprestimosService, PrismaService],
  imports: [PrismaModule, HttpModule],
})
export class EmprestimosModule {}
