'use client';

import { useEffect, useState } from 'react';
import { TransactionTypeEnum } from '@/enums/transaction-type.enum';
import { transactionTypeOptions } from '@/mocks/transaction-types.mock';
import CircleButton from '@/components/common/CircleButton/CircleButton';
import { PencilIcon, TrashIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { formatCurrency, formatDate, formatDateTime, formatMonth } from '@/utils/formatters';
import InputMoney from '@/components/common/InputMoney/InputMoney';
import { useDeleteTransactions } from '@/hooks/useDeleteTransactions';
import { TransactionResponseDTO } from '@/core/dto/transaction/TransactionResponseDTO';
import { useSortedTransactions } from '@/hooks/useSortedTransactions';
import { emitter } from '@/lib/event-emitter';

interface BankStatmentProps {
  data: TransactionResponseDTO[];
}

export default function DashboardBankStatment({ data }: BankStatmentProps) {
  const [transactions, setTransactions] = useSortedTransactions<TransactionResponseDTO>(data);
  const { deleteTransactions } = useDeleteTransactions(setTransactions);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, { amount: number }>>({});

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch(`/api/transactions`);
      if (res.ok) {
        const updated = await res.json();
        setTransactions(updated);
      }
    };

    emitter.on('transations:refresh', fetchAll);

    return () => {
      emitter.off('transations:refresh', fetchAll);
    };
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const confirmDelete = async () => {
    const success = await deleteTransactions(selectedIds);
    if (success) {
      emitter.emit('balance:refresh');
      setSelectedIds([]);
      setIsDeleting(false);
    }
  };

  const startEditing = () => {
    const initialValues = transactions.reduce((acc, tx) => {
      acc[tx.id] = { amount: Number(tx.amount) };
      return acc;
    }, {} as Record<string, { amount: number }>);

    setEditValues(initialValues);
    setIsEditing(true);
  };

  const confirmEdit = async () => {
    try {
      const updates = Object.entries(editValues).filter(([id, { amount }]) => {
        const original = transactions.find((tx) => tx.id === id);
        return original && original.amount !== amount;
      });

      await Promise.all(
        updates.map(([id, { amount }]) =>
          fetch(`/api/transactions/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, updatedAt: new Date().toISOString() }),
          })
        )
      );

      setTransactions((prev) =>
        prev.map((tx) => {
          const update = editValues[tx.id];
          const changed = updates.find(([id]) => id === tx.id);
          if (changed && update) {
            return { ...tx, amount: update.amount, updatedAt: new Date() };
          }
          return tx;
        })
      );

      setIsEditing(false);
      setEditValues({});
      emitter.emit('balance:refresh');
    } catch (error) {
      console.error('Erro ao editar transações:', error);
    }
  };

  const renderActions = () => {
    if (isDeleting) {
      return (
        <>
          <CircleButton
            icon={XMarkIcon}
            onClick={() => {
              setIsDeleting(false);
              setSelectedIds([]);
            }}
          />
          <CircleButton icon={CheckIcon} onClick={confirmDelete} />
        </>
      );
    }

    if (isEditing) {
      return (
        <>
          <CircleButton
            icon={XMarkIcon}
            onClick={() => {
              setIsEditing(false);
              setEditValues({});
            }}
          />
          <CircleButton icon={CheckIcon} onClick={confirmEdit} />
        </>
      );
    }

    return (
      <>
        <CircleButton icon={PencilIcon} onClick={startEditing} />
        <CircleButton icon={TrashIcon} onClick={() => setIsDeleting(true)} />
      </>
    );
  };

  return (
    <div className="bg-bytebank-white rounded-lg w-full max-h-[86.4vh] flex flex-col p-5 overflow-hidden md:px-[25%] lg:px-5">
      <div className="flex justify-between items-center h-10 shrink-0">
        <span className="text-bytebank-xl text-black font-bold">Extrato</span>
        <div className="flex items-center gap-x-2">
          {renderActions()}
        </div>
      </div>

      <div className="mt-6 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-bytebank-green/70 scrollbar-track-transparent">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex flex-col w-full">
            <span className="font-semibold text-bytebank-green text-bytebank-sm capitalize">
              {formatMonth(tx.createdAt)}
            </span>

            <div className="flex justify-between py-2 items-center">
              <div className="flex items-center gap-2">
                {isDeleting && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(tx.id)}
                    onChange={() => toggleSelection(tx.id)}
                  />
                )}
                <span className="text-base text-black font-normal">
                  {formatTransactionType(tx.type)}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-normal text-bytebank-muted text-bytebank-sm">
                  {formatDate(tx.createdAt)}
                </span>
                {tx?.updatedAt && (
                  <span className="font-semibold text-bytebank-green text-bytebank-sm text-right block">
                    Atualizado em {formatDateTime(tx.updatedAt)}
                  </span>
                )}
              </div>
            </div>

            {isEditing ? (
              <InputMoney
                value={editValues[tx.id]?.amount ?? 0}
                color="bytebank-green"
                onChange={(newVal) => {
                  setEditValues((prev) => ({
                    ...prev,
                    [tx.id]: { amount: newVal },
                  }));
                }}
              />
            ) : (
              <span className="font-semibold text-base">
                {formatCurrency(Number(tx.amount))}
              </span>
            )}

            <div className="w-4/5 h-px bg-bytebank-green mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTransactionType(type: TransactionTypeEnum | string): string {
  const option = transactionTypeOptions.find((opt) => opt.type === type);
  return option ? option.value : 'Outro';
}