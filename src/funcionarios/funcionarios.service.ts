import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

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

  async findAll() {
    return this.prisma.funcionario.findMany();
  }

  async findOne(id: number) {
    return this.prisma.funcionario.findUnique({where: {id}});
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    const { nomeCompleto, cpf, email, senha, salario, empresaId } = updateFuncionarioDto;

    const funcionario = await this.prisma.funcionario.findUnique({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return this.prisma.funcionario.update({
      where: { id },
      data: {
        nomeCompleto,
        cpf,
        email,
        senha: funcionario.senha, // Atualiza senha se fornecida
        salario: parseFloat(salario), // Converte salario para number
        empresaId,
      },
    });
  }

  async remove(id: number) {
    const funcionario = await this.prisma.funcionario.findUnique({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return this.prisma.funcionario.delete({ where: { id } });
  }

}

