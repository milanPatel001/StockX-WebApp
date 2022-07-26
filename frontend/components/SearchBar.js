import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { autoComplete } from "../utils/stockService";
import _ from "lodash";

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
    const { data } = await autoComplete(e.currentTarget.value);

    // const res = data.filter((word) => word.startsWith(value));
    if (value === 0) setResults([]);
    else setResults(data.Result);
    //else setResults(res);
    console.log(results);
  };

  return (
    <React.Fragment>
      <div className="relative w-2/5 object-center ml-100">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          onChange={handleSearchChange}
          //onBlur={() => setResults([])}
          className="bg-white h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-current focus:border-slate-100 block w-full pl-10 p-2.5"
          placeholder="Search for stocks, crypto and more ...."
          required
        />
      </div>

      {value.length !== 0 && (
        <div className="container mx-101 absolute rounded-b-xl py-1 h-auto w-7/20 z-40 bg-white border border-gray-400 shadow-xl">
          {results.slice(0, 6).map((stock) => (
            <div className="container hover:bg-gray-100">
              <div className="flex flex-row py-1.5 pl-2 divide-y">
                <div className={tickerBG()}>{stock.symbol}</div>
                <div className="container hover:bg-gray-100 pl-3 font-semibold">
                  <Link href={`/home/${stock.symbol}`}>{stock.name}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
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
