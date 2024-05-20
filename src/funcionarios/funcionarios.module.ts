import { Module } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmpresasService } from 'src/empresas/empresas.service';


@Module({
  controllers: [FuncionariosController],
  providers: [
     FuncionariosService,
     PrismaService, 
     EmpresasService,  
     ],
  imports: [PrismaModule],
})
export class FuncionariosModule {}
