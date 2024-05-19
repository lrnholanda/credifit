
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EmprestimosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private async validateScore(salario: number): Promise<boolean> {
    const scoreResponse = await firstValueFrom(
      this.httpService.get<{score: number}>('https://run.mocky.io/v3/ef99c032-8e04-4e6a-ad3e-6f413a9e707a')
    );
    
    const score = scoreResponse.data.score;
    console.log('Score:', score);

    return (salario <= 2000 && score >= 400) ||
    (salario <= 4000 && score >= 500) ||
    (salario <= 8000 && score >= 600) ||
    (salario <= 12000 && score >= 700);
}

  private calcularParcelas(valor: number, parcelas: number) {
    const valorParcela = valor / parcelas;
    const parcelasDetalhes = [];

    for (let i = 0; i < parcelas; i++) {
      const dataVencimento = new Date();
      dataVencimento.setMonth(dataVencimento.getMonth() + i + 1);
      parcelasDetalhes.push({
        valorParcela,
        dataVencimento,
      });
    }

    return parcelasDetalhes;
  }

  async create(createEmprestimoDto: CreateEmprestimoDto) {
    const { funcionarioId, valor, parcelas } = createEmprestimoDto;
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { id: funcionarioId },
      include: { Empresa: true },
    });

    if (!funcionario) {
      throw new BadRequestException('Funcionário não encontrado');
    }

    if (!funcionario.Empresa) {
      throw new BadRequestException('Funcionário não pertence a uma empresa conveniada');
    }

    const isScoreValid = await this.validateScore(funcionario.salario);

    if (!isScoreValid) {
      throw new BadRequestException('Score insuficiente para solicitar o empréstimo');
    }

    const emprestimo = await this.prisma.emprestimo.create({
      data: {
        valor,
        parcelas,
        status: true,
        funcionarioId,
      },
    });

    const parcelasDetalhes = this.calcularParcelas(valor, parcelas).map((detalhe) => ({
      ...detalhe,
      emprestimoId: emprestimo.id,
    }));

    await this.prisma.parcela.createMany({
      data: parcelasDetalhes,
    });

    return {
      ...emprestimo,
      parcelasDetalhes,
    };
  }

  async findAll() {
    return this.prisma.emprestimo.findMany({
      include: {
        parcelasDetalhes: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.emprestimo.findUnique({
      where: { id },
      include: {
        parcelasDetalhes: true,
      },
    });
  }

  async update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    return this.prisma.emprestimo.update({
      where: { id },
      data: updateEmprestimoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.emprestimo.delete({
      where: { id },
    });
  }
}
