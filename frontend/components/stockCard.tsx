import React, { useEffect, useState } from "react";

import CheckButton from "./CheckButton";
import { useRouter } from "next/navigation";
import { cardPercentsign, cardTickerBG } from "@/utils/extra";
import { StockCardProps } from "@/backend";
import Link from "next/link";

function StockCard(props: StockCardProps) {
  const data = {
    percent: "30%",
    price: "$20.2",
    symbol: "APP",
    name: "Demo_Stock INC.",
  };

  const [tickerColor, setTickerColor] = useState("");
  const [percentColor, setPercentColor] = useState("");

  useEffect(() => {
    setTickerColor(cardTickerBG());
    setPercentColor(cardPercentsign(props.stock.regularMarketChangePercent));
  }, [props.stock]);

  return (
    <div className="relative transition duration-500 ease-in-out hover:bg-gray-50 hover:scale-105 cursor-pointer">
      <Link href={`/stock/${props.stock.symbol}`}>
        <div className="flex flex-col border-2 border-slate-300 my-auto gap-1.5 rounded-xl w-48 bg-white p-2 shadow-xl">
          <div className={tickerColor}>{props.stock.symbol}</div>
          <div className="inline-block font-semibold ml-1 truncate">
            {props.stock.shortName}
          </div>

          <div className="inline-block w-fit ml-1 font-semibold text-center">
            ${props.stock.regularMarketPrice}
          </div>

          <div className={percentColor}>
            {props.stock.regularMarketChangePercent.toFixed(2)}
          </div>
        </div>
      </Link>
      <div className="absolute right-4 bottom-4">
        <CheckButton
          watchlist={props.watchlist}
          name={props.stock.shortName}
          symbol={props.stock.symbol}
          price={props.stock.regularMarketPrice}
          change={props.stock.regularMarketChangePercent}
        />
      </div>
    </div>
  );
}

export default StockCard;
