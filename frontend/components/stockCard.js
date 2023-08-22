import _ from "lodash";
import React, { useEffect, useState } from "react";

import CheckButton from "./CheckButton";
import { useRouter } from "next/navigation";

function StockCard(props) {
  const data = {
    percent: "30%",
    price: "$20.2",
    symbol: "APP",
    name: "Demo_Stock INC.",
  };

  const router = useRouter();

  const [color, setColor] = useState();

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

  function percentsign(percent) {
    let percentsign =
      "inline-block pr-2 pl-2 py-1 w-fit text-base font-bold rounded-lg text-center ";
    percentsign +=
      percent > 0 ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-700";
    return percentsign;
  }

  function tickerBG() {
    let style =
      "inline-block w-fit ml-1 text-xs text-center rounded-lg font-bold text-white px-2 mt-1 py-0.5 ";
    style += color;
    return style;
  }

  useEffect(() => {
    setColor(_.sample(colors));
  }, [props.stock]);

  return (
    <div
      className="flex flex-col border-2 border-slate-300 my-auto gap-1.5 rounded-xl w-48 bg-white p-2 transition duration-300 hover:bg-gray-50 hover:scale-125 cursor-pointer shadow-xl"
      //onClick={() => router.push("/home/" + props.stock.symbol)}
    >
      <div className={tickerBG()}>{props.stock.symbol}</div>
      <div className="inline-block font-semibold ml-1 truncate">
        {props.stock.shortName}
      </div>

      <div className="inline-block w-fit ml-1 font-semibold text-center">
        ${props.stock.regularMarketPrice}
      </div>

      <div className={percentsign(props.stock.regularMarketChangePercent)}>
        {props.stock.regularMarketChangePercent.toFixed(2)}
      </div>

      <CheckButton
        stock={props.stock}
        name={props.stock.shortName}
        symbol={props.stock.symbol}
        price={props.stock.regularMarketPrice}
        change={props.stock.regularMarketChangePercent}
      />
    </div>
  );
}

export default StockCard;
