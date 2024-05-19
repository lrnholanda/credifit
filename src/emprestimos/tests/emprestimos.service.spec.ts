import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimosService } from '../emprestimos.service'; 
import { PrismaService } from '../../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { BadRequestException } from '@nestjs/common';

describe('EmprestimosService', () => {
  let service: EmprestimosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmprestimosService,
        {
          provide: PrismaService,
          useValue: {
            funcionario: {
              findUnique: jest.fn(),
            },
            emprestimo: {
              create: jest.fn(),
            },
            parcela: {
              createMany: jest.fn(),
            },
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(of({ data: { score: 580 } })),
          },
        },
      ],
    }).compile();

    service = module.get<EmprestimosService>(EmprestimosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('validação do score e criar emprestimo', async () => {
    // Mockando a resposta do PrismaService
    const mockFuncionario = {
      id: 48,
      nomeCompleto: 'Serena',
      cpf: '123.456.789-10',
      email: 'serena@example.com',
      senha: 'password123',
      salario: 2400,
      empresaId: 2,
      Empresa: {
        id: 2,
        nome: 'Credifit',
      },
    };

    jest.spyOn(prisma.funcionario, 'findUnique').mockResolvedValue(mockFuncionario);
    jest.spyOn(prisma.emprestimo, 'create').mockResolvedValue({
      id: 1,
      funcionarioId: mockFuncionario.id,
      valor: 5000,
      parcelas: 4,
      status: true,
    });

    jest.spyOn(prisma.parcela, 'createMany').mockResolvedValue({
      count: 4,
    });

    const emprestimoDto = {
      funcionarioId: 48,
      valor: 5000,
      parcelas: 4,
    };

    const resultado = await service.create(emprestimoDto);

    expect(resultado).toBeDefined();
    expect(resultado.status).toBe(true);
    expect(prisma.funcionario.findUnique).toHaveBeenCalledWith({
      where: { id: emprestimoDto.funcionarioId },
      include: { Empresa: true },
    });
    expect(prisma.emprestimo.create).toHaveBeenCalledWith({
      data: {
        funcionarioId: mockFuncionario.id,
        valor: emprestimoDto.valor,
        parcelas: emprestimoDto.parcelas,
        status: true,
      },
    });
    expect(prisma.parcela.createMany).toHaveBeenCalled();
  });
});
