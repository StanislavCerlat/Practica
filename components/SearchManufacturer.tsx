"use client";
import {useState, Fragment} from 'react';
import Image from 'next/image';
import { Combobox, Transition } from '@headlessui/react';
import { manufacturers } from '@/constants';
import { SearchManufacturerProps } from '@/types';

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
    const [query, setQuery] = useState('');
    const filteredManufacturers = query ===""?
    manufacturers : manufacturers.filter((item) => (
        item.toLowerCase()
        .replace(/\s+/g,"")
        .includes (query.toLowerCase().replace(/\s+/g,""))
    ))
  return (
    <div className="search-manufacturer">
      <Combobox>
        <div className="relative w-full">
          {/* Iconul mașinii */}
          <img
            src="/car-logo.svg"
            alt="Car Logo"
            height={20}
            width={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />

          {/* Inputul */}
          <Combobox.Input
            className="search-manufacturer__input pl-10"
             placeholder="volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />

<Transition
  as={Fragment}
  leave="transition ease-in duration-100"
  leaveFrom="opacity-0"
  afterLeave={() => setQuery('')}
>
  <Combobox.Options>
    {filteredManufacturers.length === 0 && query !== "" ? (
      <Combobox.Option
        value={query}
        className="search-manufacturer__option"
      >
        Create "{query}"
      </Combobox.Option>
    ) : (
      filteredManufacturers.map((item) => (
        <Combobox.Option
          key={item}
          className={({ active }) =>
            `relative search-manufacturer__option ${
              active ? 'bg-primary-blue text-white' : 'text-gray-900'
            }`
          }
          value={item}
        >
          {item}
        </Combobox.Option>
      ))
    )}
  </Combobox.Options>
</Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
