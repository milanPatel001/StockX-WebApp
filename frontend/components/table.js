import React, { useState, useEffect } from "react";
import StockCard from "./stockCard";
import _ from "lodash";
import { useRouter } from "next/router";

function Table(props) {
  const [currentTab, setCurrentTab] = useState("Actives");

  const router = useRouter();

  let marketTab = [];
  if (currentTab === "Losers") {
    marketTab = props.losers;
  } else if (currentTab === "Gainers") {
    marketTab = props.gainers;
  } else {
    marketTab = props.actives;
  }

  function pricesign(price) {
    let pricesign = "text-sm pr-2 sm:text-base font-bold ";
    pricesign += price < 0 ? "text-rose-700" : "text-green-700";
    return pricesign;
  }

  function percentsign(percent) {
    let percentsign =
      "pr-0.5 pl-1 py-1 text-xs sm:text-base font-bold rounded-lg text-center ";
    percentsign +=
      percent > 0 ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-700";
    return percentsign;
  }

  function activeTab(tab) {
    var style =
      "py-1 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700";

    if (tab === currentTab)
      style =
        "py-1 px-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ring-1 z-10 ring-gray-200";

    return style;
  }

  function tickerBG() {
    const colors = [
      "bg-rose-600",
      "bg-rose-800",
      "bg-sky-500",
      "bg-green-700",
      "bg-green-400",
      "bg-fuchsia-700",
      "bg-fuchsia-900",
      "bg-indigo-500",
      "bg-green-600",
    ];

    let style =
      "inline-block text-center rounded-lg text-xs font-bold text-white px-2 pt-0.5 pb-1 ";
    style += _.sample(colors);
    return style;
  }

  return (
    <div>
      <div className="flex flex-row pt-1.5 pb-4 pl-2 gap-2">
        <button
          className={activeTab("Actives")}
          onClick={() => setCurrentTab("Actives")}
        >
          Actives
        </button>
        <button
          className={activeTab("Gainers")}
          onClick={() => setCurrentTab("Gainers")}
        >
          Gainers
        </button>
        <button
          className={activeTab("Losers")}
          onClick={() => setCurrentTab("Losers")}
        >
          Losers
        </button>
      </div>

      <div className="h-full w-full border-2 border-stone-300 rounded-3xl pt-2 px-4 pb-5 bg-white">
        <table className="w-full h-full rounded-xl text-left">
          <tbody>
            {marketTab.map((stock) => (
              <tr
                className="bg-white border-b transition duration-300 hover:scale-125 cursor-pointer"
                onClick={() => router.push("/home/" + stock.ticker)}
              >
                <td className="py-3 pr-1 w-fit">
                  <div className={tickerBG()}>{stock.ticker}</div>
                </td>
                <td className="bg-gray font-normal text-black text-m sm:text-lg">
                  {stock.name}
                </td>
                <td className="text-sm sm:text-base pr-3 font-semibold text-black">
                  ${stock.lastPrice.toFixed(3)}
                </td>
                <td className={pricesign(stock.netChange)}>
                  {stock.netChange.toFixed(2)}
                </td>
                <td>
                  <div className={percentsign(stock.percentNetChange)}>
                    {stock.percentNetChange.toFixed(2)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
