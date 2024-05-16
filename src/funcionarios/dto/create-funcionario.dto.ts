import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFuncionarioDto {

    @IsString()
    @IsNotEmpty()
    nomeCompleto: string

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
    empresaId: number
}
