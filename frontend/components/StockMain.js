"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import CheckButton from "./CheckButton";
import Graph from "./Graph";
import SideBlock from "./SideBlock";
import StockCard from "./stockCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

export default function StockMain({ stockData, graphData, bio, growthStocks }) {
  const [currentTab, setCurrentTab] = useState("1D");
  const [watchlist, setWatchlist] = useState([]);
  const [userLoggedIn] = useAuthState(auth);

  function activeTab(tab) {
    var style =
      "py-1 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700";

    if (tab === currentTab)
      style =
        "py-1 px-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ring-1 z-10 ring-gray-200";

    return style;
  }

  function percentsign(percent) {
    let percentsign =
      "inline-block px-3 pl-4 my-4 ml-5 py-2 w-fit text-xl font-bold rounded-lg text-center ";
    percentsign +=
      percent > 0 ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-700";
    return percentsign;
  }

  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/watchlist/${userLoggedIn.uid}`
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
                  {userLoggedIn?.uid && (
                    <CheckButton
                      watchlist={watchlist}
                      stock={stockData}
                      name={stockData.quote.shortName}
                      symbol={stockData?.underlyingSymbol}
                      price={stockData.quote.regularMarketPrice}
                      change={stockData.quote.regularMarketChangePercent}
                    />
                  )}
                </div>

                {/*userLoggedIn && (
                  <div className="py-2 ml-1.5 mt-3.5 cursor-pointer">
                    {checked == false ? (
                      <PlusCircleIcon
                        onClick={handleCheck}
                        className="h-6 w-6 hover:scale-125 hover:text-blue-500"
                      />
                    ) : (
                      <CheckCircleIcon
                        onClick={handleUncheck}
                        className="h-6 w-6 text-blue-500 hover:scale-125"
                      />
                    )}
                  </div>
                    )*/}
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
              <div className="hidden xl:inline-flex">
                <StockCard watchlist={watchlist} stock={stock} key={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}