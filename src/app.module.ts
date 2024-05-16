import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresasModule } from './empresas/empresas.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';


@Module({
  imports: [PrismaModule, EmpresasModule, FuncionariosModule, EmprestimosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
