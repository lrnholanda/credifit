import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService){}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const { nomeCompleto, cpf, email, senha, salario, empresaId } = createFuncionarioDto; 

    // Verifica se já existe um funcionário com o mesmo CPF ou e-mail
    const existingFuncionario = await this.prisma.funcionario.findFirst({
      where: { OR: [{ cpf }, { email }] },
    });

    if (existingFuncionario) {
      throw new BadRequestException('CPF ou e-mail já cadastrado');
    }

    // Cria o funcionário no banco de dados
    return this.prisma.funcionario.create({
      data: {
        nomeCompleto,
        cpf,
        email,
        senha, 
        salario: parseFloat(salario), // Converte salario para number
        empresaId, // Inclui empresaId no objeto
      },
    });
  }

}
