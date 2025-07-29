"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export interface Option<T = any> {
  id: string;
  value: string;
  type?: T;
}

interface InputSelectProps<T = any> {
  options: Option<T>[];
  value?: Option<T>;
  placeholder?: string;
  onChange?: (value: Option<T>) => void;
}

export default function InputSelect<T>({
  options,
  value,
  placeholder = "Selecione uma opção",
  onChange,
}: InputSelectProps<T>) {
  const selected = value ?? { id: "", value: placeholder };

  function handleChange(option: Option<T>) {
    onChange?.(option);
  }

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <ListboxButton
            className="h-12 w-full px-4 pr-10 text-left rounded-lg border border-bytebank-black text-bytebank-input-gray bg-white focus:outline-none transition-all"
          >
            {selected.value}
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronUpDownIcon
                className="w-5 h-5 text-bytebank-black"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute mt-[-5px] max-h-60 w-full overflow-auto rounded-b-lg border border-bytebank-black bg-white z-10">
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 h-[51px] flex items-center justify-center ${
                    active
                      ? "bg-bytebank-input-black text-bytebank-input-gray font-bold"
                      : "text-bytebank-input-gray text-base font-normal"
                  }`
                }
              >
                {option.value}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}