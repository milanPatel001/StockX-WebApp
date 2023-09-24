"use client";

import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SideWatchBlock({ watchlist }) {
  return (
    <div className="flex flex-col w-full gap-4 p-4 border border-gray-400 rounded-lg">
      <div className="flex gap-2 items-center">
        <ClockIcon className="w-7 h-7" />
        <p className="font-semibold text-3xl font-serif">Watchlist</p>
      </div>

      {watchlist?.map((w) => (
        <>
          <div className="w-full border border-gray-100"></div>
          <div className="flex flex-row" key={w.stockName}>
            <div className="flex w-3/4 font-semibold text-lg">
              {w.stockName}
            </div>
            <div className="flex justify-end w-1/4 font-semibold">
              $ {w.stockPrice}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
