import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function StockCard(props) {
  const data = {
    percent: "30%",
    price: "$20.2",
    symbol: "APP",
    name: "Demo_Stock INC.",
  };

  const router = useRouter();

  function percentsign(percent) {
    let percentsign =
      "inline-block pr-2 pl-2 py-1 w-fit text-base font-bold rounded-lg text-center ";
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

  return (
    <div>
      <div
        className="flex flex-col border-2 border-slate-300 gap-1.5 h-fit w-fit rounded-xl bg-white p-2 transition duration-300 hover:bg-gray-50 hover:scale-125 cursor-pointer shadow-xl"
        onClick={() => router.push("/home/" + props.stock.symbol)}
      >
        <div className={tickerBG()}>{props.stock.symbol}</div>
        <div className="inline-block font-semibold ml-1">
          {props.stock.shortName}
        </div>

        <div className="inline-block w-fit ml-1 font-semibold text-center">
          ${props.stock.regularMarketPrice}
        </div>
        <div className={percentsign(props.stock.regularMarketChangePercent)}>
          +{props.stock.regularMarketChangePercent.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default StockCard;
