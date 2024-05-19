import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimosService } from './emprestimos.service';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
