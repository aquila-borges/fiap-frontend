import { useState } from "react";

export function useSortedTransactions<T extends { createdAt: Date; updatedAt?: Date }>(
  initialItems?: T[] // parâmetro opcional
) {
  // converte datas e ordena a lista inicial
  function parseDates(items: any[]): T[] {
    return items.map((t) => ({
      ...t,
      createdAt: new Date(t.createdAt),
      updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined,
    }));
  }

  function sortByUpdatedOrCreated(items: T[]): T[] {
    const sorted = [...items].sort((a, b) => {
      const aDate = a.updatedAt ?? a.createdAt;
      const bDate = b.updatedAt ?? b.createdAt;
      return bDate.getTime() - aDate.getTime();
    });
    return sorted;
  }

  // inicializa estado com lista já parseada e ordenada
  const [_items, _setItems] = useState<T[]>(
    initialItems ? sortByUpdatedOrCreated(parseDates(initialItems)) : []
  );

  function setSortedItems(newItemsOrUpdater: T[] | ((prev: T[]) => T[])) {
    _setItems((prev) => {
      const resolved =
        typeof newItemsOrUpdater === "function"
          ? newItemsOrUpdater(prev)
          : newItemsOrUpdater;

      const parsed = parseDates(resolved);
      const sorted = sortByUpdatedOrCreated(parsed);
      return sorted;
    });
  }

  return [_items, setSortedItems] as const;
}