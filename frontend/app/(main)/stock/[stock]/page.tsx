import Searchbar from "@/components/SearchBar";
import StockMain from "@/components/StockMain";
import StockCardMini from "@/components/stockcard_mini";

export default async function StockPage({ params }: any) {
  const [res, res2, res3, res4] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_DEV_API_URL}/api/stocks/${params.stock}`),
    fetch(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/stocks/bio/${params.stock}`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/stocks/stockGraph/${params.stock}/1d`
    ),
    fetch(`${process.env.NEXT_PUBLIC_DEV_API_URL}/api/stocks/growthTechStocks`),
  ]);

  const [std, bio, graphData, growthStocks] = await Promise.all([
    res.json(),
    res2.json(),
    res3.json(),
    res4.json(),
  ]);

  return (
    <div className="bg-white">
      <div className="flex flex-row h-auto p-2 py-4 gap-7 justify-center">
        <StockCardMini />
      </div>

      <div className="relative p-4 max-w-2xl mx-auto">
        <Searchbar />
      </div>

      <StockMain
        stockData={std}
        bio={bio}
        growthStocks={growthStocks}
        graphData={graphData}
      />
    </div>
  );
}
