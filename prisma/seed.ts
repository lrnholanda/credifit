import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar empresas
  const empresa1 = await prisma.empresa.create({
    data: {
      cnpj: '12345678000100',
      razaoSocial: 'Empresa ABC',
      nomeCompleto: 'João Silva',
      cpf: '12345678901',
      email: 'joao@empresaabc.com',
      senha: 'senha123',
    },
  });

  const empresa2 = await prisma.empresa.create({
    data: {
      cnpj: '98765432000199',
      razaoSocial: 'Empresa XYZ',
      nomeCompleto: 'Maria Souza',
      cpf: '98765432109',
      email: 'maria@empresaxyz.com',
      senha: 'senha456',
    },
  });

  // Criar funcionários
  const funcionario1 = await prisma.funcionario.create({
    data: {
      nomeCompleto: 'Carlos Oliveira',
      cpf: '32165498700',
      email: 'carlos@empresaabc.com',
      senha: 'senha789',
      salario: 3000,
      empresaId: empresa1.id,
    },
  });

  const funcionario2 = await prisma.funcionario.create({
    data: {
      nomeCompleto: 'Ana Pereira',
      cpf: '65432198700',
      email: 'ana@empresaxyz.com',
      senha: 'senha101',
      salario: 5000,
      empresaId: empresa2.id,
    },
  });

  console.log({ empresa1, empresa2, funcionario1, funcionario2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
