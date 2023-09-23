import Navbar from "@/components/NavBar";
import Main from "@/components/Main";

export default async function Home() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_DEV_API_URL + "/api/stocks/marketNews"
  );
  const marketNews = await res.json();

  const res2 = await fetch(
    process.env.NEXT_PUBLIC_DEV_API_URL + "/api/stocks/popular"
  );
  const popularStocks = await res2.json();

  const res3 = await fetch(
    process.env.NEXT_PUBLIC_DEV_API_URL + "/api/stocks/market_movers"
  );
  const marketMovers = await res3.json();

  console.log(process.env.NEXT_PUBLIC_DEV_API_URL);

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
