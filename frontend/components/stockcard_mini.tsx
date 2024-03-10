"use client";

import {
  miniData,
  percentsignStockMini,
  tickerBGStockMini,
} from "@/utils/extra";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";
import _ from "lodash";
import { useRouter } from "next/navigation";

const calcDisp = (i: number, sign: string) => {
  let miniStyle =
    "h-16 w-52 transition duration-300 hover:scale-105 flex flex-row rounded-xl items-center border-2 bg-opacity-30 ";

  if (sign[0] === "-") miniStyle += "bg-red-50 border-red-300 ";
  else miniStyle += "bg-green-50 border-green-300 ";

  if (i == 2) miniStyle += "hidden md:inline-flex";
  else if (i == 3) miniStyle += "hidden lg:inline-flex";
  else if (i == 4) miniStyle += "hidden xl:inline-flex";
  return miniStyle;
};

function StockCardMini() {
  return (
    <div className="flex flex-row gap-5 cursor-default">
      {miniData.map((mini, i) => (
        <div className={calcDisp(i, mini.percent)} key={i}>
          <div>
            {mini.percent[0] === "-" ? (
              <ArrowDownCircleIcon className="h-8 w-8 text-red-500" />
            ) : (
              <ArrowUpCircleIcon className="h-8 w-8 text-green-500" />
            )}
          </div>
          <div className="flex flex-col gap-1 py-1 px-1 w-full">
            <div className="flex flex-row h-1/2">
              {/* <div className={tickerBGStockMini("bg-rose-500")}>
                {mini.symbol}
              </div> */}
              <div className="text-sm font-bold">{mini.name}</div>
            </div>

            <div className="flex flex-row h-1/2">
              <div className="font-bold text-m">{mini.price}</div>
              <div className={percentsignStockMini(mini.percent)}>
                {mini.percent}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StockCardMini;
