"use client";

import { ClientWithBalanceResponseDTO } from "@/core/dto/client/ClientWithBalanceResponseDTO";
import { emitter } from "@/lib/event-emitter";
import { formatCurrency, formatDateWithDayOfWeek } from "@/utils/formatters";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface DashboardBalanceProps {
  data: ClientWithBalanceResponseDTO;
}

export default function DashboardBalance({ data }: DashboardBalanceProps) {
  const [bankAccount, setBankAccountData] = useState(data.bankAccount);
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  useEffect(() => {
    const fetchUpdatedBalance = async () => {
      const res = await fetch(`/api/bankAccounts/${bankAccount.id}`);
      if (res.ok) {
        const updated = await res.json();
        setBankAccountData(updated);
      }
    };

    emitter.on("balance:refresh", fetchUpdatedBalance);

    return () => {
      emitter.off("balance:refresh", fetchUpdatedBalance);
    };

  }, [bankAccount.id]);

  return (
    <div className="bg-bytebank-black rounded-lg w-full p-5 pl-6">
      <div className="flex flex-col">
        <div className="mb-3">
          <div className="font-semibold text-bytebank-xl text-white w-full">
            Olá, {data?.name ? `${data.name.split(" ")[0]} :)` : "..."}
          </div>
        </div>

        <div className="font-normal text-bytebank-sm text-white">
          {formatDateWithDayOfWeek(new Date())}
        </div>
      </div>

      <div className="float-right ">
        <div className="flex items-center border-b-2 border-b-bytebank-orange py-3 mb-3 min-w-[250px] mr-5">
          <span className="text-xl font-semibold text-white">Saldo</span>
          {showBalance ? (
            <EyeSlashIcon
              className="w-5 h-5 text-bytebank-orange ml-4 hover:cursor-pointer"
              onClick={toggleBalanceVisibility}
            />
          ) : (
            <EyeIcon
              className="w-5 h-5 text-bytebank-orange ml-4 hover:cursor-pointer"
              onClick={toggleBalanceVisibility}
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-white text-base font-normal">Conta Corrente</span>

          <span className="text-white font-normal text-[31px]">
            {showBalance ? formatCurrency(Number(bankAccount.balance)) : "••••••"}
          </span>
        </div>
      </div>
    </div>
  );
}