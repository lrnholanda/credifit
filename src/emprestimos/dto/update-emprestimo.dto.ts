import { PartialType } from '@nestjs/swagger';
import { CreateEmprestimoDto } from './create-emprestimo.dto';

export class UpdateEmprestimoDto extends PartialType(CreateEmprestimoDto) {}
