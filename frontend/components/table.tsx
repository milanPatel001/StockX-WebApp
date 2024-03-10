import React, { useState, useEffect, useMemo } from "react";
import _ from "lodash";

import TableRow from "./tableRow";
import { TableProps } from "@/backend";
import { tableTickerBG } from "@/utils/extra";

function Table({ marketMovers, watchlist }: TableProps) {
  enum Movers {
    Actives,
    Gainers,
    Losers,
  }

  const [currentTab, setCurrentTab] = useState<Movers>(Movers.Actives);

  const [tickerColors, setTickerColors] = useState<string[][]>([]);

  function activeTab(tab: Movers) {
    var style =
      "py-1 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700";

    if (tab === currentTab)
      style =
        "py-1 px-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ring-1 z-10 ring-gray-200";

    return style;
  }

  const marketTab = useMemo(() => {
    //console.log(tickerColors[currentTab]);
    switch (currentTab) {
      case Movers.Gainers:
        return marketMovers?.gainers || [];
      case Movers.Losers:
        return marketMovers?.losers || [];
      default:
        return marketMovers?.actives || [];
    }
  }, [currentTab, marketMovers]);

  useEffect(() => {
    const c = tableTickerBG();
    setTickerColors(c);
  }, []);

  useEffect(() => {
    setCurrentTab(Movers.Actives);
  }, [marketMovers]);

  return (
    <div>
      <div className="flex flex-row pt-1.5 pb-4 pl-2 gap-2">
        <button
          className={activeTab(Movers.Actives)}
          onClick={() => setCurrentTab(Movers.Actives)}
        >
          Actives
        </button>
        <button
          className={activeTab(Movers.Gainers)}
          onClick={() => setCurrentTab(Movers.Gainers)}
        >
          Gainers
        </button>
        <button
          className={activeTab(Movers.Losers)}
          onClick={() => setCurrentTab(Movers.Losers)}
        >
          Losers
        </button>
      </div>

      <div className="h-full w-full border-2 border-stone-300 rounded-3xl pt-2 px-4 pb-5 bg-white">
        <table className="w-full h-full rounded-xl text-left">
          <tbody>
            {marketTab?.map((stock, index) => (
              <TableRow
                key={stock.name}
                stock={stock}
                watchlist={watchlist}
                color={
                  tickerColors[currentTab]
                    ? tickerColors[currentTab][index]
                    : "red"
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
