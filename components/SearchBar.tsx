"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
const SearchButton = ({ otherClasses }: {otherClasses: string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>

<Image
src="/magnifying-glass.svg"
alt="magnifying glass"
width={40}
height={40}
className="object-contain" />
    </button>
)
import {SearchManufacturer} from "./";

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    // Sync with URL parameters on component mount
    useEffect(() => {
        const manufacturerParam = searchParams.get('manufacturer');
        const modelParam = searchParams.get('model');
        
        if (manufacturerParam) {
            setManufacturer(manufacturerParam);
        }
        if (modelParam) {
            setModel(modelParam);
        }
    }, [searchParams]);
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      
      if (manufacturer) {
        params.set('manufacturer', manufacturer.toLowerCase());
      } else {
        params.delete('manufacturer');
      }
      if (model) {
        params.set('model', model.toLowerCase());
      } else {
        params.delete('model');
      }
      
      // Reset to first page when searching
      params.delete('limit');
      
      router.push(`/?${params.toString()}`);
    }

    const handleClearFilters = () => {
      setManufacturer('');
      setModel('');
      router.push('/');
    }
  return (
    <div className="searchbar">
      <form onSubmit={handleSearch} className="flex flex-row gap-4 w-full">
        <div className="searchbar__item flex-1">
          <SearchManufacturer
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
          />
        </div>
        <div className='searchbar__item flex-1'>
          <Image
            src="/model-icon.png"
            width={25}
            height={25}
            className='absolute left-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px]'
            alt="car model"
          />
          <input
            type="text"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Tiguan"
            className="searchbar__input"
          />
          <SearchButton otherClasses="absolute right-2 top-1/2 -translate-y-1/2 flex" />
        </div>
      </form>
      
      {/* Clear Filters Button */}
      {(manufacturer || model || searchParams.get('fuel') || searchParams.get('year')) && (
        <button
          onClick={handleClearFilters}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Image
            src="/close.svg"
            width={16}
            height={16}
            alt="clear"
            className="object-contain"
          />
          Clear Filters
        </button>
      )}
    </div>
  )
}

export default SearchBar