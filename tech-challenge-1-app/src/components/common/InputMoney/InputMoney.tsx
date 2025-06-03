'use client';

import { NumericFormat } from 'react-number-format';

type InputMoneyProps = {
  value?: number;
  onChange?: (value: number) => void;
  color?: string; // Ex: 'bytebank-green', 'bytebank-black'
};

export default function InputMoney({
  value,
  onChange,
  color = 'bytebank-black',
}: InputMoneyProps) {
  return (
    <NumericFormat
      value={value}
      onValueChange={({ floatValue }) => {
        onChange?.(floatValue ?? 0);
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative
      prefix="R$ "
      inputMode="numeric"
      className={`h-12 w-[250px] px-4 pr-10 text-center rounded-lg border border-${color} text-bytebank-input-gray bg-white focus:outline-none transition-all placeholder-bytebank-input-gray`}
    />
  );
}