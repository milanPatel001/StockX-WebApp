import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  addToWatchlist,
  removeFromWatchlist,
  stockInWatchlist,
} from "../utils/userService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function StockCard(props) {
  const data = {
    percent: "30%",
    price: "$20.2",
    symbol: "APP",
    name: "Demo_Stock INC.",
  };

  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [color, setColor] = useState();
  const [userLoggedIn] = useAuthState(auth);

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

  const handleCheck = async () => {
    try {
      await addToWatchlist(userLoggedIn.uid, {
        stockName: props.stock.shortName,
        stockSymbol: props.stock.symbol,
        stockPrice: props.stock.regularMarketPrice,
        stockPercentChange: props.stock.regularMarketChangePercent,
      });

      setChecked(!checked);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUncheck = async () => {
    try {
      await removeFromWatchlist(userLoggedIn.uid, props.stock.symbol);
      setChecked(!checked);
    } catch (err) {
      console.log(err);
    }
  };

  const checkStockInWatchlist = async () => {
    if (!userLoggedIn) return false;
    try {
      const status = await stockInWatchlist(
        userLoggedIn.uid,
        props.stock.symbol
      );
      setChecked(status.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkStockInWatchlist();
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

      {userLoggedIn && (
        <div className="mx-auto">
          {checked == false ? (
            <PlusCircleIcon
              onClick={handleCheck}
              className="h-6 w-6 hover:scale-125 hover:text-blue-500"
            />
          ) : (
            <CheckCircleIcon
              onClick={handleUncheck}
              className="h-6 w-6 text-blue-500 hover:scale-125"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default StockCard;
