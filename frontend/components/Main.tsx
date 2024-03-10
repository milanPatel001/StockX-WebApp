"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import NewsBigBlock from "./News";
import Searchbar from "./SearchBar";
import SideBlock from "./SideBlock";
import StockCard from "./stockCard";
import StockCardMini from "./stockcard_mini";
import { auth } from "@/firebase";
import { Suspense, lazy, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableSkeleton from "./skeletons/TableSkeleton";
import SideWatchBlock from "./SideWatchBlock";
import { User } from "firebase/auth";
import { MainProps, Stock } from "@/backend";
const Table = lazy(() => import("./table"));

export default function Main({
  marketMovers,
  popularStocks,
  marketNews,
}: MainProps) {
  const [userLoggedIn] = useAuthState(auth);
  const [watchlist, setWatchlist] = useState([]);

  const getData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/watchlist/${userLoggedIn?.uid}`
    );
    const data = await res.json();

    //console.log(data);
    setWatchlist(data);
  };

  useEffect(() => {
    if (userLoggedIn?.uid) getData();
  }, [userLoggedIn]);

  function style(loggedIn: User | null | undefined): string {
    if (loggedIn)
      return "lg:w-2/3 lg:pl-10 h-auto p-2 bg-white divide-y-2 divide-gray-200";
    return "lg:pl-10 h-auto p-2 bg-white divide-y-2 divide-gray-200";
  }

  return (
    <>
      <div className="bg-gray-50 mx-auto">
        <div className="flex h-auto md:p-2 py-4 space-x-7 justify-center bg-gray-50">
          <ToastContainer />
          <StockCardMini />
        </div>

        <div className="relative p-4 max-w-2xl mx-auto">
          <Searchbar />
        </div>

        <div className="md:p-3 h-auto bg-gray-50">
          <div className="p-2 py-10 h-full md:w-3/4 mx-auto bg-white shadow-2xl rounded-2xl">
            <div className="h-auto mx-auto bg-white xl:px-60 pb-7">
              <p className="font-semibold text-2xl pb-2 pl-2 ">Market Trend</p>
              <Suspense fallback={<TableSkeleton />}>
                <Table marketMovers={marketMovers} watchlist={watchlist} />
              </Suspense>
            </div>

            <div className="flex flex-nowrap pb-3">
              <div className={style(userLoggedIn)}>
                <div className="inline-block py-3 px-2 font-semibold text-2xl">
                  Today's Financial news
                </div>
                <NewsBigBlock news={marketNews} />
              </div>
              {userLoggedIn && (
                <div className="hidden lg:flex w-1/3 h-fit sticky top-20 p-2 bg-white">
                  <SideWatchBlock watchlist={watchlist} />
                </div>
              )}
            </div>
            <div className="p-2">
              <p className="hidden xl:inline-block text-3xl font-medium ml-3">
                Popular Stocks
              </p>
              <div className="flex h-auto p-2 py-4 space-x-7 justify-center">
                {popularStocks?.slice(0, 5).map((s: Stock, i: number) => (
                  <div key={i} className="hidden xl:inline-flex">
                    <StockCard
                      key={s?.symbol}
                      stock={s}
                      watchlist={watchlist}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
