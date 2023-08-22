"use client";

import _ from "lodash";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function StockCardMini(props) {
  const data = {
    percent: "-30",
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
    let percentsign = "pl-4 text-m ";
    percentsign += percent > 0 ? "text-green-800" : "text-rose-700";
    return percentsign;
  }

  function tickerBG() {
    let style =
      "inline-block ml-4 text-xs text-center rounded-lg font-bold text-white px-1 mt-1 py-0.5 ";
    style += color;
    return style;
  }

  useEffect(() => {
    setColor(_.sample(colors));
  }, [data]);

  return (
    <div
      className="flex flex-col border-2 border-slate-300 gap-1 h-16 w-52 py-1 px-1 rounded-xl bg-white transition duration-300 hover:bg-gray-50 hover:scale-125 cursor-pointer"
      onClick={() => router.push("/home/" + data.symbol)}
    >
      <div className="flex flex-row h-6">
        <div className={tickerBG()}>{data.symbol}</div>
        <div className="text-sm font-bold pl-2 pt-0.5">{data.name}</div>
      </div>

      <div className="flex flex-row h-4">
        <div className={percentsign(data.percent)}>{data.percent}%</div>
        <div className="font-bold text-m pl-8">{data.price}</div>
      </div>
    </div>
  );
}

export default StockCardMini;
