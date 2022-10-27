import React from "react";
import { useEffect, useState } from "react";
import { getMarketNews } from "../utils/stockService";
import Link from "next/link";

function NewsBigBlock({ news }) {
  const [marketnews, setNews] = useState(news);

  /*
  useEffect(() => {
    async function getNews() {
      let { data } = await getMarketNews();
      let marketNews = data.slice(0, 10);
      setNews(marketNews);
    }
    getNews();
  }, []);
  */

  return (
    <React.Fragment>
      {marketnews.map((n) => (
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
              <a target="_blank">{n.title}</a>
            </Link>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default NewsBigBlock;
