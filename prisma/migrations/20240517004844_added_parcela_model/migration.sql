-- CreateTable
CREATE TABLE "Parcela" (
    "id" SERIAL NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "emprestimoId" INTEGER NOT NULL,

    CONSTRAINT "Parcela_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parcela" ADD CONSTRAINT "Parcela_emprestimoId_fkey" FOREIGN KEY ("emprestimoId") REFERENCES "Emprestimo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
