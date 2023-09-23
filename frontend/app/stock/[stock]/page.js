import Navbar from "@/components/NavBar";
import Searchbar from "@/components/SearchBar";
import StockMain from "@/components/StockMain";
import StockCardMini from "@/components/stockcard_mini";

export default async function StockPage({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/stocks/${params.stock}`
  );
  const std = await res.json();

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/stocks/bio/${params.stock}`
  );
  const bio = await res2.json();

  const res4 = await fetch(
    process.env.NEXT_PUBLIC_DEV_API_URL + "/api/stocks/growthTechStocks"
  );
  const growthStocks = await res4.json();

  const res3 = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_API_URL}/api/stocks/stockGraph/${params.stock}/1d`
  );
  const graphData = await res3.json();

  return (
    <>
      <Navbar />

      <div className="flex flex-row h-auto p-2 py-4 gap-7 justify-center">
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
      <StockMain
        stockData={std}
        bio={bio}
        growthStocks={growthStocks}
        graphData={graphData}
      />
    </>
  );
}
