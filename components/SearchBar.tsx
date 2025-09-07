"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = new URLSearchParams(window.location.search);
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
      router.push(`/?${params.toString()}`);
    }
  return (
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
<SearchManufacturer
manufacturer={manufacturer}
setManufacturer={setManufacturer}/>
        </div>
        <div className='searchbar__item'>
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
            className="searchbar__input "
          />
          <SearchButton otherClasses="absolute right-2 top-1/2 -translate-y-1/2 sm:flex" />
        </div>
  
    </form>
  )
}

export default SearchBar