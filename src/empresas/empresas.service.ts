import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  prismaService: any;
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmpresaDto : CreateEmpresaDto){
    const { cnpj, email } = createEmpresaDto;

    const existingEmpresa = await this.prisma.empresa.findFirst({
      where: { OR: [{ cnpj }, { email }]},
    });

    if (existingEmpresa) {
      throw new BadRequestException('CNPJ ou Email já cadastrado');
    }

    return this.prisma.empresa.create({ data: createEmpresaDto});        
  }

  async findAll() {
    return this.prisma.empresa.findMany();
  }

  async findOne(id: number) {
    return this.prisma.empresa.findUnique({where: {id}});
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return this.prisma.empresa.update({
      where: { id },
      data: updateEmpresaDto,
    });
  }

  async remove(id: number) {
    return this.prisma.empresa.delete({ where: { id}});
  }
}
    


