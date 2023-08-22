"use client";

import React from "react";
import { useEffect, useState } from "react";
import { getMarketNews } from "../utils/stockService";
import Link from "next/link";

export default function NewsBigBlock({ news }) {
  const [marketnews, setNews] = useState([]);

  useEffect(() => {
    /*
    async function getNews() {
      const res = await fetch("http://localhost:3000/api/stocks/marketNews");
      const data = await res.json();

      console.log(data);
      setNews(data);
    }
    getNews();
    */

    setNews(news);
  }, [news]);

  return (
    <React.Fragment>
      {marketnews?.slice(0, 10).map((n) => (
        <div key={n.title} className="flex flex-col p-2 hover:bg-gray-100">
          <div className="container pb-2">
            <div className="inline-block font-semibold text-gray-500">
              {n.source}
            </div>
            <div className="inline-block pl-3 text-gray-600 font-mono">
              {n.pubDate.slice(0, 10)}
            </div>
          </div>

          <div className="container text-xl font-semibold pb-1 font-serif">
            <Link key={n.source} href={n.link}>
              {n.title}
            </Link>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
