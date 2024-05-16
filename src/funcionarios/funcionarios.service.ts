import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'crypto';

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService){}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const { nomeCompleto, cpf, email, senha, salario, empresaId } = createFuncionarioDto; // Include empresaId

    // Hash the password before saving
    //const hashedPassword = await hash(senha,10);
; // Adjust cost factor as needed

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
        senha, // Use hashed password
        salario: parseFloat(salario), // Convert salario to number (assuming string)
        empresaId, // Include empresaId in data object
      },
    });
  }

}
