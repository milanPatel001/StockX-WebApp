import React, { useState, useEffect, useMemo } from "react";
import CheckButton from "./CheckButton";
import { useRouter } from "next/navigation";
import { percentsign, pricesign, tickerBG } from "@/utils/extra";

function TableRow({ stock, watchlist }) {
  const [tickerColor, setTickerColor] = useState("");
  const [priceColor, setPriceColor] = useState("");
  const [percentColor, setPercentColor] = useState("");

  const router = useRouter();

  useEffect(() => {
    setTickerColor(tickerBG());
    setPriceColor(pricesign(stock.netChange));
    setPercentColor(percentsign(stock.percentNetChange));
  }, []);

  return (
    <tr className="border-b transition duration-300 ease-out hover:scale-105 cursor-pointer">
      <td className="py-3 pr-1 w-fit">
        <div className={tickerColor}>{stock.ticker}</div>
      </td>
      <td
        className="bg-gray font-normal text-black text-m sm:text-lg"
        onClick={() => router.push("/stock/" + stock.ticker)}
      >
        {stock.name}
      </td>
      <td className="text-sm sm:text-base pr-3 font-semibold text-black">
        ${stock.lastPrice.toFixed(3)}
      </td>
      <td className={priceColor}>{stock.netChange.toFixed(2)}</td>
      <td>
        <div className={percentColor}>{stock.percentNetChange.toFixed(2)}%</div>
      </td>
      <td className="pl-2">
        <CheckButton
          stock={stock}
          name={stock.name}
          symbol={stock.ticker}
          price={stock.lastPrice}
          change={stock.percentNetChange}
          watchlist={watchlist}
        />
      </td>
    </tr>
  );
}

export default TableRow;
