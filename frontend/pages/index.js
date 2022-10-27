import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import NewsBigBlock from "../components/News";
import Searchbar from "../components/SearchBar";
import SideBlock from "../components/SideBlock";
import StockCard from "../components/stockCard";
import StockCardMini from "../components/stockcard_mini";
import Table from "../components/table";
import {
  getPopularStocks,
  getMarketMovers,
  getMarketNews,
} from "../utils/stockService";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Home(props) {
  const [popularStocks, setPopularStocks] = useState(props.popularStocks);
  const [marketMovers_actives, setActives] = useState(
    props.marketMovers_actives
  );
  const [marketMovers_losers, setLosers] = useState(props.marketMovers_losers);
  const [marketMovers_gainers, setGainers] = useState(
    props.marketMovers_gainers
  );
  const [news, setNews] = useState(props.marketNews);

  // const [similarStocks, setSimilarStocks] = useState([]);

  const [userLoggedIn] = useAuthState(auth);

  /*
  async function getData() {
    let { data: popularStocks } = await getPopularStocks();
    popularStocks = popularStocks.slice(0, 5);
    let { data: marketMovers } = await getMarketMovers();

    let marketMovers_actives = marketMovers.actives.slice(0, 6);
    let marketMovers_gainers = marketMovers.gainers.slice(0, 6);
    let marketMovers_losers = marketMovers.losers.slice(0, 6);

    setActives(marketMovers_actives);
    setGainers(marketMovers_gainers);
    setLosers(marketMovers_losers);
    setPopularStocks(popularStocks);
  }

  useEffect(() => {
    getData();
  }, []);
*/

  return (
    <React.Fragment>
      <div className="bg-gray-50 mx-auto">
        <Navbar />

        <div className="flex h-auto p-2 py-4 space-x-7 justify-center bg-gray-50">
          <StockCardMini />
          <StockCardMini />

          <div className="hidden md:inline-flex">
            <StockCardMini />
          </div>

          <div className="hidden lg:inline-flex">
            <StockCardMini />
          </div>

          <div className="hidden xl:inline-flex">
            <StockCardMini />
          </div>
        </div>

        <div className="relative p-4 max-w-2xl mx-auto">
          <Searchbar />
        </div>

        <div className="md:p-3 h-auto bg-gray-50">
          <div className="p-2 py-10 h-full md:w-3/4 mx-auto bg-white shadow-2xl rounded-2xl">
            <div className="h-auto mx-auto bg-white xl:px-60 pb-7">
              <p className="font-semibold text-2xl pb-2 pl-2 ">Market Trend</p>
              <Table
                actives={marketMovers_actives}
                losers={marketMovers_losers}
                gainers={marketMovers_gainers}
              />
            </div>

            <div className="flex flex-nowrap pb-3">
              <div className={style(userLoggedIn)}>
                <div className="inline-block py-3 px-2 font-semibold text-2xl">
                  Today's Financial news
                </div>
                <NewsBigBlock news={news} />
              </div>
              {userLoggedIn && (
                <div className="hidden md:inline-flex basis-1/4 h-auto p-2 bg-white">
                  <SideBlock />
                </div>
              )}
            </div>
            <div className="flex h-auto p-2 py-4 space-x-7 justify-center">
              {popularStocks?.map((s) => (
                <div key={s?.symbol} className="hidden xl:inline-flex">
                  <StockCard key={s?.symbol} stock={s} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function style(loggedIn) {
  if (loggedIn)
    return "md:basis-3/4 md:pl-10 h-auto p-2 bg-white divide-y-2 divide-gray-200";
  return "md:pl-10 h-auto p-2 bg-white divide-y-2 divide-gray-200";
}

export default Home;

export async function getStaticProps() {
  let { data } = await getMarketNews();
  let marketNews = data.slice(0, 10);

  let { data: popularStocks } = await getPopularStocks();
  popularStocks = popularStocks.slice(0, 5);

  let { data: marketMovers } = await getMarketMovers();

  let marketMovers_actives = marketMovers.actives.slice(0, 6);
  let marketMovers_gainers = marketMovers.gainers.slice(0, 6);
  let marketMovers_losers = marketMovers.losers.slice(0, 6);

  return {
    props: {
      marketNews,
      popularStocks,
      marketMovers_actives,
      marketMovers_gainers,
      marketMovers_losers,
    },
  };
}
