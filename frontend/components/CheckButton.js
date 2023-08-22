"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckButton({
  stock,
  name,
  symbol,
  price,
  change,
  watchlist,
}) {
  const [checked, setChecked] = useState(false);
  const [userLoggedIn] = useAuthState(auth);

  const handleCheck = async () => {
    if (userLoggedIn?.uid) {
      try {
        const options = {
          method: "POST",
          url: `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/add`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            stockName: name,
            stockSymbol: symbol,
            stockPrice: price,
            stockPercentChange: change,
          }),
          cache: "no-store",
        };

        const res = await fetch(
          `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/add`,
          options
        );

        const result = await res.json();

        if (result.passed) {
          toast.success(`Added ${name} to Watchlist`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setChecked(!checked);
        } else {
          toast.error(`Can't add ${name} to watchlist!!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (err) {
        toast.error(`Can't add ${name} to watchlist!!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const handleUncheck = async () => {
    try {
      const options = {
        method: "POST",
        url: `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/remove/${symbol}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
      };

      const res = await fetch(
        `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/remove/${symbol}`,
        options
      );

      const result = await res.json();

      if (result.passed) {
        toast.success(`Removed ${name} from Watchlist`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setChecked(!checked);
      } else {
        toast.error(`Can't remove ${name} from watchlist!!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error(`Can't remove ${name} from watchlist!!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const checkStockInWatchlist = async () => {
    // console.log(symbol);
    const found = watchlist?.find((st) => st.stockSymbol == symbol);

    if (found?.stockSymbol) {
      console.log(found);
      setChecked(true);
    }
    /*
    if (!userLoggedIn) return false;
    try {
      const res = await fetch(
        `http://localhost:3000/api/watchlist/${userLoggedIn.uid}/${props.symbol}`
      );
      const result = await res.json();

      setChecked(result.data);
    } catch (err) {
      console.log(err);
    }
    */
  };

  useEffect(() => {
    checkStockInWatchlist();
  }, [userLoggedIn, watchlist]);

  return (
    userLoggedIn?.uid && (
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
