"use client";

import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import ButtonPrimary from "@/components/common/ButtonPrimary/ButtonPrimary";
import InputMoney from "@/components/common/InputMoney/InputMoney";
import InputSelect, { Option } from "@/components/common/InputSelect/InputSelect";
import { TransactionTypeEnum } from "@/enums/transaction-type.enum";
import { transactionTypeOptions } from "@/mocks/transaction-types.mock";
import { useState } from "react";
import { emitter } from "@/lib/event-emitter";

interface TransactionProps  {
  bankAccountId: string;
}

export default function DashboardTransaction({ bankAccountId }: TransactionProps) {
  const { createTransaction, loading } = useCreateTransaction();
  // Option completa, não só o enum
  const [selectedType, setSelectedType] = useState<Option<TransactionTypeEnum> | undefined>(undefined);
  const [amount, setAmount] = useState<number>(0);

  async function handleSubmit() {
    if (!selectedType || amount === 0) return;

    const success = await createTransaction({
      type: selectedType.type as TransactionTypeEnum,
      amount,
      bankAccountId
    });

    if (success) {
      emitter.emit("balance:refresh");
      emitter.emit("transations:refresh");
      setAmount(0);
      setSelectedType(undefined);
      alert("Transação criada com sucesso!");
    } else {
      alert("Erro ao criar transação.");
    }
  }

  return (
    <div className="bg-bytebank-gray rounded-lg w-full h-full p-7 relative overflow-hidden flex flex-col ">
      <img
        src="/images/Pixels3.png"
        className="h-[140px] w-[140px] md:h-[180px] md:w-[180px] absolute top-0 left-0 md:left-auto md:right-0 opacity-80 pointer-events-none"
      />

      <img
        src="/images/Pixels4.png"
        className="h-[140px] w-[140px] md:h-[180px] md:w-[180px] absolute bottom-0 right-0 md:right-auto md:left-0 opacity-80 pointer-events-none"
      />

      <div className="z-10 w-full">
        <div className="flex flex-col gap-6 mb-9 items-center md:items-start">
          <span className="font-bold text-bytebank-xl text-bytebank-light-green">Nova transação</span>

          <div className="md:w-[350px] w-full">
            <InputSelect
              options={transactionTypeOptions}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Selecione o tipo de transação"
            />
          </div>
          

          <div className="mb-2">
            <span className="font-semibold text-bytebank-light-green text-base mb-2 block">Valor</span>
            <InputMoney value={amount} onChange={setAmount} />
          </div>

          <ButtonPrimary
            onClick={handleSubmit}
            disabled={loading || !selectedType || amount === 0}
            aria-busy={loading}
            aria-disabled={loading || !selectedType || amount === 0}
          >
            {loading ? "Processando..." : "Concluir transação"}
          </ButtonPrimary>
        </div>

        
      </div>

      <img src="/images/Ilustracao2.png" className="md:absolute bottom-5 right-5 pointer-events-none lg:hidden z-5 w-auto self-center" />
    </div>
  );
}
