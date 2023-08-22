import React, { useState, useEffect } from "react";
import _ from "lodash";

import TableRow from "./tableRow";
import { useRouter } from "next/navigation";

function Table({ marketMovers }) {
  const [currentTab, setCurrentTab] = useState("Actives");
  const [movers, setMarketMovers] = useState([]);
  const [marketTab, setMarketTab] = useState([]);

  const router = useRouter();

  function activeTab(tab) {
    var style =
      "py-1 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700";

    if (tab === currentTab)
      style =
        "py-1 px-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ring-1 z-10 ring-gray-200";

    return style;
  }

  useEffect(() => {
    setMarketTab(marketMovers?.actives);
    setMarketMovers(marketMovers);
  }, [marketMovers]);

  useEffect(() => {
    if (movers.actives) {
      if (currentTab === "Losers") {
        setMarketTab(movers.losers);
      } else if (currentTab === "Gainers") {
        setMarketTab(movers.gainers);
      } else {
        setMarketTab(movers.actives);
      }
    }
  }, [currentTab]);

  return (
    <div>
      <div className="flex flex-row pt-1.5 pb-4 pl-2 gap-2">
        <button
          className={activeTab("Actives")}
          onClick={() => setCurrentTab("Actives")}
        >
          Actives
        </button>
        <button
          className={activeTab("Gainers")}
          onClick={() => setCurrentTab("Gainers")}
        >
          Gainers
        </button>
        <button
          className={activeTab("Losers")}
          onClick={() => setCurrentTab("Losers")}
        >
          Losers
        </button>
      </div>

      <div className="h-full w-full border-2 border-stone-300 rounded-3xl pt-2 px-4 pb-5 bg-white">
        <table className="w-full h-full rounded-xl text-left">
          <tbody>
            {marketTab?.map((stock, i) => (
              <TableRow key={i} stock={stock} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
