import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimosService } from './emprestimos.service';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { of } from 'rxjs';

describe('EmprestimosService', () => {
  let service: EmprestimosService;
  let prisma: PrismaService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmprestimosService,
        {
          provide: PrismaService,
          useValue: {
            funcionario: { findUnique: jest.fn() },
            emprestimo: { create: jest.fn() },
            parcela: { createMany: jest.fn() },
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<EmprestimosService>(EmprestimosService);
    prisma = module.get<PrismaService>(PrismaService);
    httpService = module.get<HttpService>(HttpService);
  });
  it('validação do score e criar emprestimo', async () => {
    jest.spyOn(prisma.funcionario, 'findUnique').mockResolvedValue({
      nomeCompleto: "Carlos Oliveira",
      cpf: "32165498700",
      email: "carlos@empresaabc.com",
      senha: "senha789",
      salario: 3000,
      empresaId: 1,
      Empresa: {
        id: 1, 
        cnpj: "85685848557897",
        razaoSocial: "Loren",
        nomeCompleto: "Lore",
        cpf: "6879793678796",
        email: "holanda@gmail.com",
        senha: "789790"
      }
    });
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({ data: { score: 580 } } as any)
    );
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
