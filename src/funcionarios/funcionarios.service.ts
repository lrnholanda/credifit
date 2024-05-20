import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService){}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const { nomeCompleto, cpf, email, senha, salario, empresaId } = createFuncionarioDto;

    // Verifica se o salário é um número válido
    if (isNaN(parseFloat(salario))) {
      throw new BadRequestException('O salário deve ser um número');
    }

    // Verifica se o ID da empresa é um número válido
    if (isNaN(Number(empresaId))) {
      throw new BadRequestException('O ID da empresa deve ser um número');
    }

    return this.prisma.funcionario.create({
      data: {
        nomeCompleto,
        cpf,
        email,
        senha,
        salario: parseFloat(salario),
        empresaId: Number(empresaId),
      },
    });
  }

  async findAll() {
    return this.prisma.funcionario.findMany();
  }

  async findOne(id: number) {
    const funcionario = await this.prisma.funcionario.findUnique({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return funcionario;
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    const { nomeCompleto, cpf, email, senha, salario, empresaId } = updateFuncionarioDto;

    // Verifica se o salário é um número válido
    if (isNaN(parseFloat(salario))) {
      throw new BadRequestException('O salário deve ser um número');
    }

    // Verifica se o ID da empresa é um número válido
    if (isNaN(Number(empresaId))) {
      throw new BadRequestException('O ID da empresa deve ser um número');
    }

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
        empresaId: Number(empresaId), // Converte empresaId para number
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
