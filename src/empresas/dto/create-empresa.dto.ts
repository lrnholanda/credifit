import { IsEmail, IsNotEmpty, IsString, isString } from "class-validator";

export class CreateEmpresaDto {
    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    razaoSocial: string;

    @IsString()
    @IsNotEmpty()
    nomeCompleto: string;

    @IsString()
    @IsNotEmpty()
    cpf: string

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;
}
