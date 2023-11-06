import Navbar from "@/components/NavBar";
import Main from "@/components/Main";

export default async function Home() {
  const [res, res2, res3] = await Promise.all([
    fetch(process.env.NEXT_PUBLIC_DEV_API_URL + "/api/stocks/marketNews"),
    fetch(process.env.NEXT_PUBLIC_DEV_API_URL + "/api/stocks/popular"),
    fetch(process.env.NEXT_PUBLIC_DEV_API_URL + "/api/stocks/market_movers"),
  ]);

  const [marketNews, popularStocks, marketMovers] = await Promise.all([
    res.json(),
    res2.json(),
    res3.json(),
  ]);

  return (
    <>
      <Navbar />
      <Main
        marketNews={marketNews}
        popularStocks={popularStocks.slice(0, 5)}
        marketMovers={marketMovers}
      />
    </>
  );
}
