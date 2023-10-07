"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import CheckButton from "./CheckButton";
import Graph from "./Graph";
import SideBlock from "./SideBlock";
import StockCard from "./stockCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { activeTab, percentsign } from "@/utils/extra";

export default function StockMain({ stockData, graphData, bio, growthStocks }) {
  const [currentTab, setCurrentTab] = useState("1D");
  const [watchlist, setWatchlist] = useState([]);
  const [userLoggedIn] = useAuthState(auth);

  const getData = async () => {
    const res = await fetch(
      `${NEXT_PUBLIC_DEV_API_URL}/api/watchlist/${userLoggedIn.uid}`
    );
    const data = await res.json();

    console.log(data);
    setWatchlist(data);
  };

  useEffect(() => {
    if (userLoggedIn?.uid) getData();
  }, [userLoggedIn]);

  return (
    <>
      <div className="h-screen w-full">
        <ToastContainer />
        <div className="p-2 lg:w-3/4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-2 pb-3 rounded-xl shadow-xl my-5 border-2">
            <div className="flex flex-col lg:pl-10 h-auto p-2 divide-y-2 divide-gray-200 py-3 lg:w-2/3">
              <div className="flex flex-row">
                <div className="inline-block ml-1 text-sm text-center rounded-lg font-bold text-white py-2 my-5 mt-3.5 px-4 bg-red-400">
                  {stockData?.underlyingSymbol}
                </div>
                <div className="inline-block p-2 ml-1.5 font-semibold text-3xl mt-1">
                  {stockData?.quote.shortName}
                </div>

                <div className="py-2 ml-1.5 mt-3.5 cursor-pointer">
                  <CheckButton
                    watchlist={watchlist}
                    stock={stockData}
                    name={stockData.quote.shortName}
                    symbol={stockData?.underlyingSymbol}
                    price={stockData.quote.regularMarketPrice}
                    change={stockData.quote.regularMarketChangePercent}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="inline-block py-2 text-6xl font-semibold font-mono">
                  ${stockData?.quote.regularMarketPrice}
                </div>
                <div
                  className={percentsign(
                    stockData?.quote.regularMarketChangePercent
                  )}
                >
                  {stockData?.quote.regularMarketChangePercent.toFixed(3)}%
                </div>
              </div>

              <div className="py-4">
                <div className="flex pt-1.5 pb-4 pl-2 gap-2">
                  <button
                    className={activeTab("1D")}
                    onClick={() => setCurrentTab("1D")}
                  >
                    1D
                  </button>
                  <button
                    className={activeTab("5D")}
                    onClick={() => setCurrentTab("5D")}
                  >
                    5D
                  </button>
                  <button
                    className={activeTab("1M")}
                    onClick={() => setCurrentTab("1M")}
                  >
                    1M
                  </button>
                </div>

                <Graph graphData={graphData} />
              </div>
            </div>
            <div className="p-2 bg-white">
              <SideBlock stockData={stockData} />
            </div>
          </div>

          <div>
            <p className="bg-white px-3 pb-4 pt-3 font-semibold text-3xl">
              About
            </p>
            <div className="container border border-gray-400 rounded-xl bg-white mx-auto py-2 px-4 ">
              <div
                className="container p-2 text-lg first-line:uppercase first-line:tracking-widest
                                    first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
                                        first-letter:mr-3 first-letter:float-left"
              >
                {bio?.assetProfile?.longBusinessSummary}
              </div>
            </div>
          </div>
          <div className="hidden xl:inline-block w-full pl-4 pt-3 mt-3 text-xl font-semibold">
            You might Like:
          </div>
          <div className="flex flex-row h-auto p-2 py-4 gap-7 justify-center">
            {growthStocks?.slice(0, 5).map((stock, i) => (
              <div className="hidden xl:inline-flex" key={i}>
                <StockCard watchlist={watchlist} stock={stock} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
