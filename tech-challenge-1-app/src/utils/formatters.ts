// Funções utilitárias para exibir texto formatado
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatDate(date: Date): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return parsedDate?.toLocaleDateString('pt-BR');
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatMonth(date: Date): string {;
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return parsedDate.toLocaleDateString("pt-BR", {
    month: "long",
  });
}

export function formatDateWithDayOfWeek(date: Date): string {  
  const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${day}/${month}/${year}`;
}