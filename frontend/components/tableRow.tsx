import React, { useState, useEffect, useMemo } from "react";
import CheckButton from "./CheckButton";
import { useRouter } from "next/navigation";
import { percentsign, pricesign, tickerBG } from "@/utils/extra";
import { TableRowProps } from "@/backend";
import Link from "next/link";

function TableRow({ stock, watchlist, color }: TableRowProps) {
  // const [tickerColor, setTickerColor] = useState<string>(
  //   "inline-block rounded-lg text-xs font-bold text-black border-black border-1 px-2 pt-0.5 pb-1"
  // );
  const [priceColor, setPriceColor] = useState<string>("");
  const [percentColor, setPercentColor] = useState<string>("");

  //const router = useRouter();

  useEffect(() => {
    //setTickerColor(tickerBG());
    setPriceColor(pricesign(stock.netChange));
    setPercentColor(percentsign(stock.percentNetChange));
  }, []);

  return (
    <tr className="border-b transition duration-300 ease-out hover:scale-105 cursor-pointer">
      <td className="py-3 pr-1 w-fit">
        <div
          className={`inline-block rounded-lg text-xs font-bold text-white border-black border-1 px-2 pt-0.5 pb-1 ${color}`}
        >
          {stock.ticker}
        </div>
      </td>
      <td className="bg-gray font-normal text-black text-m sm:text-lg">
        <Link href={`/stock/${stock.ticker}`}>{stock.name}</Link>
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

export default React.memo(TableRow);
