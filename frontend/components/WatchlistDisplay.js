import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function WatchlistDisplay({ stocks }) {
  const router = useRouter();

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

  if (stocks?.length === 0) return <p>Seems Empty .......</p>;
  return (
    <div className="h-full w-full border-2 border-stone-300 rounded-3xl pt-2 px-4 pb-5 bg-white">
      <table className="w-full h-full rounded-xl text-left">
        <tbody>
          {stocks?.map((stock) => (
            <tr
              key={stock.name}
              className="border-b transition duration-300 ease-out hover:scale-105 cursor-pointer"
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
  );
}

export default WatchlistDisplay;
