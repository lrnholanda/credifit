import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresasModule } from './empresas/empresas.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';


@Module({
  imports: [PrismaModule, EmpresasModule, FuncionariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
