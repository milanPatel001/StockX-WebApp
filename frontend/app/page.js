import Navbar from "@/components/NavBar";
import Main from "@/components/Main";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/stocks/marketNews");
  const marketNews = await res.json();

  const res2 = await fetch("http://localhost:3000/api/stocks/popular");
  const popularStocks = await res2.json();

  const res3 = await fetch("http://localhost:3000/api/stocks/market_movers");
  const marketMovers = await res3.json();

  return (
    <>
      <Navbar />
      <Main
        marketNews={marketNews}
        popularStocks={popularStocks}
        marketMovers={marketMovers}
      />
    </>
  );
}
