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
    <div className="bg-bytebank-black rounded-lg w-full p-5 pl-6 relative flex flex-col items-center md:items-start gap-y-6 md:gap-y-0">
      <img
        src="/images/Pixels1.png"
        className="h-[120px] w-[120px] md:h-[140px] md:w-[140px] absolute top-0 left-0 md:left-auto md:right-0 opacity-80 pointer-events-none lg:hidden"
      />
      <img
        src="/images/Pixels2.png"
        className="h-[120px] w-[120px] md:h-[140px] md:w-[140px] absolute bottom-0 md:left-0 right-0 opacity-80 pointer-events-none lg:hidden"
      />

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

      <div className="flex justify-end z-10  md:pb-20 pb-10">
        <div className="flex flex-col md:absolute right-15">
          <div className="flex items-center border-b-2 lg:border-b-bytebank-orange border-b-white py-3 mb-3 max-w-[270px] min-w-[250px]">
            <span className="text-xl font-semibold text-white">Saldo</span>
            {showBalance ? (
              <EyeSlashIcon
                className="w-5 h-5 lg:text-bytebank-orange text-white ml-4 hover:cursor-pointer"
                onClick={toggleBalanceVisibility}
              />
            ) : (
              <EyeIcon
                className="w-5 h-5 lg:text-bytebank-orange text-white ml-4 hover:cursor-pointer"
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

      <img src="/images/Ilustracao1.png" className="md:relative left-0 pointer-events-none lg:hidden z-5 w-auto self-center md:self-start" />
    </div>
  );
}