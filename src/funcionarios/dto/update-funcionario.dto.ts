import { PartialType } from '@nestjs/swagger';
import { CreateFuncionarioDto } from './create-funcionario.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFuncionarioDto extends PartialType(CreateFuncionarioDto) {
    @IsString()
    @IsNotEmpty()
    nomeCompleto: string;
  
    @IsString()
    @IsNotEmpty()
    cpf: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    senha: string;
  
    @IsNumber()
    salario: string; 
  
    @IsNumber()
    @IsOptional() // Optional if empresaId can be null
    empresaId?: number;
}
