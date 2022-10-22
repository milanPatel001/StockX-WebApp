import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import StockCardMini from "../../components/stockcard_mini";
import Searchbar from "../../components/SearchBar";
import SideBlock from "../../components/SideBlock";
import StockCard from "../../components/stockCard";
import { useRouter } from "next/router";
import {
  getStockData,
  getGraphData,
  getGrowthTechStocks,
  getBio,
} from "../../utils/stockService";
import { set } from "lodash";
import Graph from "../../components/Graph";

function StockPage(props) {
  const [stockData, setStockData] = useState(props.std);
  const [modifiedStocks, setModifiedStocks] = useState(props.growthStocks);
  const [loading, isLoading] = useState(false);
  const [graphData, setGraphData] = useState(props.graphData);
  const [currentTab, setCurrentTab] = useState("1D");
  const [bio, setBio] = useState(props.bio);

  const router = useRouter();
  const sym = router.query.symbol;

  function activeTab(tab) {
    var style =
      "py-1 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700";

    if (tab === currentTab)
      style =
        "py-1 px-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ring-1 z-10 ring-gray-200";

    return style;
  }

  function percentsign(percent) {
    let percentsign =
      "inline-block px-3 pl-4 my-4 ml-5 py-1 w-fit text-xl font-bold rounded-lg text-center ";
    percentsign +=
      percent > 0 ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-700";
    return percentsign;
  }

  useEffect(() => {
    console.log("Use Effect called");
    isLoading(true);

    async function getGrowthStockData() {
      try {
        const { data: growthStocks } = await getGrowthTechStocks();

        // const { data: std } = await getStockData(sym);
        // setStockData(std);

        setModifiedStocks(growthStocks.slice(0, 6));
      } catch (error) {
        console.log(error);
      }

      isLoading(false);
    }

    getGrowthStockData();
  }, []);

  //Object.keys(stockData).length == 0 ||
  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <React.Fragment>
      <div className="h-screen mx-auto">
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

        <div className="p-4">
          <Searchbar />
        </div>

        <div className="p-3 h-auto">
          <div className="p-2 h-full w-3/4 mx-auto">
            <div className="flex flex-col lg:flex-row pb-3 rounded-xl shadow-xl my-5 border-2">
              <div className="basis-5/7 flex flex-col lg:pl-10 h-auto p-2 divide-y-2 divide-gray-200 py-3">
                <div className="flex flex-row">
                  <div className="inline-block ml-1 text-sm text-center rounded-lg font-bold text-white py-2 my-5 mt-3.5 px-4 bg-red-400">
                    {stockData.underlyingSymbol}
                  </div>
                  <div className="inline-block p-2 ml-1.5 font-semibold text-3xl">
                    {stockData.quote.shortName}
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="inline-block py-2 text-6xl font-semibold font-mono">
                    ${stockData.quote.regularMarketPrice}
                  </div>
                  <div
                    className={percentsign(
                      stockData.quote.regularMarketChangePercent
                    )}
                  >
                    {stockData.quote.regularMarketChangePercent.toFixed(3)}%
                  </div>
                </div>

                <div className="py-4">
                  <div className="flex pt-1.5 pb-4 pl-2 gap-2">
                    <button
                      className={activeTab("1D")}
                      onClick={() => setCurrentTab("1D")}
                    >
                      1D
                    </button>
                    <button
                      className={activeTab("5D")}
                      onClick={() => setCurrentTab("5D")}
                    >
                      5D
                    </button>
                    <button
                      className={activeTab("1M")}
                      onClick={() => setCurrentTab("1M")}
                    >
                      1M
                    </button>
                  </div>

                  <Graph graphData={graphData} />
                </div>
              </div>
              <div className="basis-2/7 h-auto p-2 bg-white">
                <SideBlock stockData={stockData} />
              </div>
            </div>

            <div>
              <p className="bg-white px-3 pb-4 pt-3 font-semibold text-3xl">
                About
              </p>
              <div className="container border border-gray-400 rounded-xl bg-white mx-auto py-2 px-4 ">
                <div
                  className="container p-2 text-lg first-line:uppercase first-line:tracking-widest
                                      first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
                                          first-letter:mr-3 first-letter:float-left"
                >
                  {bio.assetProfile.longBusinessSummary}
                </div>
              </div>
            </div>
            <div className="hidden xl:inline-block w-full pl-4 pt-3 mt-3 text-xl font-semibold">
              You might Like:
            </div>
            <div className="flex flex-row h-auto p-2 py-4 gap-7 justify-center">
              {modifiedStocks.map((stock) => (
                <div className="hidden xl:inline-flex">
                  <StockCard stock={stock} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StockPage;
/*
export async function getStaticProps(){

}

export async function getStaticPaths(){

}
*/

export async function getServerSideProps(context) {
  const { params, query } = context;

  const { data: std } = await getStockData(params.symbol);
  const { data: bio } = await getBio(params.symbol);

  const { data: growthStocks } = await getGrowthTechStocks();

  const { data: graphData } = await getGraphData(params.symbol, "1d");
  //const { data: graphData5d } = await getGraphData(params.symbol, "1h");
  //const { data: graphData1mo } = await getGraphData(params.symbol, "1wk");

  //console.log(graphData);

  return {
    props: {
      std: std,
      growthStocks: growthStocks.slice(0, 6),
      graphData: graphData,
      bio: bio,
    },
  };
}

/*  {stockData.quote.shortName}
{stockData.quote.regularMarketPrice}*/
