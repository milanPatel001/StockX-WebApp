"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WatchlistDisplay({ stocks }) {
  const router = useRouter();

  const [st, setStocks] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [asc, setAsc] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [userLoggedIn] = useAuthState(auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = (event) => {
    setIsOpen(false);
  };

  /*
  const handleSort = () => {
    let s = "stockName";
    switch (sortBy) {
      case "name":
        s = "stockName";
        break;
      case "percent":
        s = "stockPercentChange";
        break;
      case "price":
        s = "stockPrice";
        break;
      default:
        s = "stockName";
    }

    if (asc) {
      stocks.sort((a, b) => a[s] - b[s]);
    } else {
      stocks.sort((a, b) => b[s] - a[s]);
    }

    setStocks(stocks);
  };
  */

  useEffect(() => {
    setStocks(stocks);
  }, [stocks]);

  /*
  useEffect(() => {
    handleSort();
  }, [asc, sortBy]);
*/

  const pricesign = (price) => {
    let pricesign = "text-sm pr-2 sm:text-base font-bold ";
    pricesign += price < 0 ? "text-rose-700" : "text-green-700";
    return pricesign;
  };

  const percentsign = (percent) => {
    let percentsign =
      "pr-0.5 pl-1 py-1 text-xs sm:text-base font-bold rounded-lg text-center ";
    percentsign +=
      percent > 0 ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-700";
    return percentsign;
  };

  const tickerBG = () => {
    let style =
      "inline-block text-center rounded-lg text-xs font-bold text-white px-2 py-1 ";
    style += "bg-red-400"; //_.sample(colors);
    return style;
  };

  const handleSetting = (setting) => {
    setSortBy(setting);
    setIsOpen(false);
  };

  const handleDelete = async (sym) => {
    try {
      let copySt = st;
      copySt = copySt.filter((stc) => stc.stockSymbol !== sym);

      console.log(copySt);

      const options = {
        method: "POST",
        url: `${NEXT_PUBLIC_DEV_API_URL}/api/watchlist/${userLoggedIn.uid}/remove/${sym}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
      };

      const res = await fetch(
        `${NEXT_PUBLIC_DEV_API_URL}/api/watchlist/${userLoggedIn.uid}/remove/${sym}`,
        options
      );

      const result = await res.json();

      if (!result.passed) {
        toast.error(`Not able to remove ${sym} !!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success(`Removed ${sym} successfully!!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      setStocks(copySt);
    } catch (err) {
      toast.error(`Something went wrong!!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  if (st?.length === 0) return <p>Seems Empty .......</p>;
  return (
    <div>
      <div className="border-2 mx-auto border-stone-300 rounded-lg pt-2 px-4 pb-5 bg-white">
        <ToastContainer />
        {/* Sorting options */}

        <div className="my-5 flex relative bg-white">
          <div className="rounded-full bg-blue-500 text-white ml-2 pl-4 pr-3 py-1 flex">
            <p onClick={toggleMenu} className="cursor-pointer">
              {sortBy.toUpperCase()}
            </p>
            <div className="h-5 w-5 ml-1 cursor-pointer">
              {asc ? (
                <ArrowUpIcon onClick={() => setAsc(false)} />
              ) : (
                <ArrowDownIcon onClick={() => setAsc(true)} />
              )}
            </div>
          </div>
          {isOpen && (
            <div
              className="bg-white absolute mt-10 ml-3.5 rounded-xl p-2 px-3 border-2"
              onMouseLeave={handleBlur}
            >
              <table className="w-full text-black font-bold">
                <td className="">
                  <tr
                    className="border-b hover:text-gray-500 cursor-pointer"
                    onClick={() => handleSetting("name")}
                  >
                    Name
                  </tr>
                  <tr
                    className="border-b hover:text-gray-500 cursor-pointer"
                    onClick={() => handleSetting("price")}
                  >
                    Price
                  </tr>
                  <tr
                    className="hover:text-gray-500 cursor-pointer"
                    onClick={() => handleSetting("percent")}
                  >
                    Change
                  </tr>
                </td>
              </table>
            </div>
          )}
        </div>

        {/* Table */}
        <table className="w-full h-full rounded-xl text-left">
          <tbody>
            {st
              ?.sort((a, b) => {
                let s = "stockName";
                switch (sortBy) {
                  case "name":
                    s = "stockName";
                    break;
                  case "percent":
                    s = "stockPercentChange";
                    break;
                  case "price":
                    s = "stockPrice";
                    break;
                  default:
                    s = "stockName";
                }

                if (s === "stockName") {
                  if (asc) return a.stockName.localeCompare(b.stockName);
                  return -1 * a.stockName.localeCompare(b.stockName);
                }

                if (asc) {
                  return a[s] - b[s];
                }
                return b[s] - a[s];
              })
              .map((stock) => (
                <tr
                  key={stock.stockName}
                  className="border-b cursor-pointer"
                  // onClick={() => router.push("/stock/" + stock.stockSymbol)}
                >
                  <td className="py-3 pr-1 w-16">
                    <div className={tickerBG()}>{stock.stockSymbol}</div>
                  </td>
                  <td className="bg-gray font-normal w-96 text-black text-m sm:text-lg">
                    {stock.stockName}
                  </td>
                  {/*
                <td className="text-sm sm:text-base pr-3 font-semibold text-black">
                ${stock.lastPrice.toFixed(3)}
              </td>
              */}

                  <td className={pricesign(stock.stockPrice)}>
                    {stock.stockPrice.toFixed(2)}
                  </td>
                  <td>
                    <div className={percentsign(stock.stockPercentChange)}>
                      {stock.stockPercentChange.toFixed(2)}%
                    </div>
                  </td>
                  <td className="pl-4">
                    <TrashIcon
                      onClick={() => handleDelete(stock.stockSymbol)}
                      className="h-12 w-12 hover:scale-150 transition ease-in-out duration-200 hover:text-red-500 px-3 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchlistDisplay;
