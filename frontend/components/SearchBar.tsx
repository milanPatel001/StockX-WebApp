"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

import Link from "next/link";
import _ from "lodash";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { searchTickerBG } from "@/utils/extra";
import { AutoComplete } from "@/backend";

function Searchbar() {
  const [results, setResults] = useState<AutoComplete[]>([]);
  const [value, setValue] = useState<string>("");
  const [tickerColors, setTickerColors] = useState<string[]>([]);
  //  const data = ["a", "b", "acd", "bcs", "ccsc", "aaa", "bsa"];

  const router = useRouter();

  useEffect(() => {
    setTickerColors(searchTickerBG());
  }, []);

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;

    setValue(value);

    if (value.length != 0) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/stocks/autocomplete/${value}`
      );
      const data = await res.json();

      // const res = data.filter((word) => word.startsWith(value));

      setResults(data?.Result);
    } else setResults([]);

    //else setResults(res);
    //console.log(results);
  };

  return (
    <div className="relative">
      <div className="flex items-center rounded-t-xl border-2 shadow-md py-1 w-full bg-white">
        <div className="bg-gray-400 ml-2 rounded-full p-1.5 mr-1">
          <MagnifyingGlassIcon className="h-6 text-white stroke-2" />
        </div>

        <input
          type="text"
          //id="simple-search"
          onChange={handleSearchChange}
          //onBlur={() => setResults([])}
          className="bg-transparent outline-none text-gray-900 text-base flex-grow pl-2 p-2.5"
          placeholder="Search for stocks, crypto and more ...."
        />
      </div>

      {value.length !== 0 && results.length > 0 && (
        <div className="absolute rounded-b-xl py-1 w-full h-auto z-40 border border-gray-400 shadow-xl bg-white">
          {results?.slice(0, 6).map((stock, i) => (
            <div key={stock.symbol} className="hover:bg-gray-100">
              <div className="grid grid-cols-9 items-center pb-4 pl-2 pt-2">
                <div className={tickerColors[i]}>
                  {stock.symbol.substring(0, 6)}
                </div>
                <div className="hover:bg-gray-100 font-semibold truncate col-span-8 ml-4 sm:ml-0">
                  <Link href={`/stock/${stock.symbol}`}>{stock.name}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Searchbar;

/*
  <input
          type="search"
          placeholder="Seach for stocks, index etc ...."
          className="form-input rounded-2xl font-semibold h-12 w-2/5 focus:outline-none shadow-lg"
          onChange={handleSearchChange}
        />
*/
