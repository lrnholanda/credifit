import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateEmprestimoDto {
    @IsPositive()
    @IsNotEmpty()
    valor: number;
  
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    parcelas: number;
  
    @IsInt()
    @IsNotEmpty()
    funcionarioId: number;
}
