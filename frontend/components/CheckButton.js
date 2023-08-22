"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export default function CheckButton(props) {
  const [checked, setChecked] = useState(false);
  const [userLoggedIn] = useAuthState(auth);

  const handleCheck = async () => {
    if (userLoggedIn.uid) {
      try {
        const options = {
          method: "POST",
          url: `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/add`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            stockName: props.name,
            stockSymbol: props.symbol,
            stockPrice: props.price,
            stockPercentChange: props.change,
          }),
          cache: "no-store",
        };

        const res = await fetch(
          `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/add`,
          options
        );

        const result = await res.json();

        if (result.passed) setChecked(!checked);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUncheck = async () => {
    try {
      const options = {
        method: "POST",
        url: `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/remove/${props.symbol}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
      };

      const res = await fetch(
        `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/remove/${props.symbol}`,
        options
      );

      const result = await res.json();

      if (result.passed) setChecked(!checked);
    } catch (err) {
      console.log(err);
    }
  };

  const checkStockInWatchlist = async () => {
    if (!userLoggedIn) return false;
    try {
      const res = await fetch(
        `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/${props.symbol}`
      );
      const result = await res.json();

      if (result.passed) setChecked(status.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkStockInWatchlist();
  }, [props.stock]);

  return (
    userLoggedIn && (
      <div className="group mx-auto relative flex flex-col items-center">
        {checked == false ? (
          <>
            <PlusCircleIcon
              onClick={handleCheck}
              className="h-6 w-6 hover:scale-125 hover:text-blue-500"
            />
            <div className="mt-7 hidden absolute text-sm text-white rounded-lg bg-gray-400 px-2 py-0.5 z-50 group-hover:inline-block transition ease-out duration-300">
              Follow
            </div>
          </>
        ) : (
          <>
            <CheckCircleIcon
              onClick={handleUncheck}
              className="h-6 w-6 text-blue-500 hover:scale-125"
            />
            <div className="mt-7 hidden absolute text-sm text-white rounded-lg bg-gray-400 px-2 py-0.5 z-50 group-hover:inline-block transition ease-out duration-300">
              Following
            </div>
          </>
        )}
      </div>
    )
  );
}
