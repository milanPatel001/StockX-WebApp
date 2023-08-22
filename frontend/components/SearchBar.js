"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import _ from "lodash";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

function Searchbar(props) {
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  //  const data = ["a", "b", "acd", "bcs", "ccsc", "aaa", "bsa"];

  const router = useRouter();

  function tickerBG() {
    const colors = [
      "bg-rose-600",
      "bg-rose-800",
      "bg-sky-500",
      "bg-green-700",
      "bg-green-500",
      "bg-fuchsia-700",
      "bg-fuchsia-900",
      "bg-indigo-500",
      "bg-green-600",
    ];

    let style =
      "inline-block w-fit ml-1 text-xs text-center rounded-lg font-bold text-white px-2 mt-1 py-0.5 ";
    style += _.sample(colors);
    return style;
  }

  const handleSearchChange = async (e) => {
    let value = e.currentTarget.value;

    setValue(value);

    if (value != 0) {
      const res = await fetch(
        `http://localhost:3000/api/stocks/autocomplete/${value}`
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

      {value.length !== 0 && (
        <div className="absolute rounded-b-xl py-1 w-full h-auto z-40 border border-gray-400 shadow-xl bg-white">
          {results?.slice(0, 6).map((stock) => (
            <div key={stock.symbol} className="hover:bg-gray-100">
              <div className="grid grid-cols-9 items-center pb-4 pl-2 divide-y">
                <div className={tickerBG()}>{stock.symbol}</div>
                <div className="hover:bg-gray-100 font-semibold truncate col-span-8 ml-4 sm:ml-0">
                  <Link href={`/home/${stock.symbol}`}>{stock.name}</Link>
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
