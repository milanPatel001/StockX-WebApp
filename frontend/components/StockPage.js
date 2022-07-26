import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../components/NavBar";
import StockCardMini from "../components/stockcard_mini";
import Searchbar from "../components/SearchBar";
import SideBlock from "./SideBlock";
import StockCard from "./stockCard";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/router";
import {
  getStockData,
  getSimilarStocks,
  getGrowthTechStocks,
} from "../utils/stockService";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import { Stock } from "../../backend/models/stock";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

const StockPage = (props) => {
  const [stockData, setStockData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [modifiedStocks, setModifiedStocks] = useState([]);
  const [period, setPeriod] = useState("1d");

  const router = useRouter();

  const sym = useMemo(() => {
    return router.query.symbol;
  }, [router.query.symbol]);

  console.log(sym);

  /*
  const data = {
    labels: [
      "163",
      "164",
      "165",
      "166",
      "167",
      "168",
      "169",
      "170",
      "171",
      "172",
    ],
    datasets: [
      {
        data: [162.524, 162.5, 160, 144, 142, 143, 139, 165, 100, 189],
      },
    ],
  };
  */

  useEffect(() => {
    console.log("Use Effect called");
    var ctx = document.getElementById("canvas").getContext("2d");

    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0.03, "rgba(81,179,45,1)");
    gradient.addColorStop(0.29, "rgba(138,238,101,0.14)");
    gradient.addColorStop(0.39, "rgba(138,238,101,0.09)");
    gradient.addColorStop(0.9, "rgba(138,238,101,0)");

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0,
          borderWidth: 2,
          fill: "start",
          borderColor: "rgba(27,149,85,1)",
          backgroundColor: gradient,
        },
        point: {
          radius: 0,
          hitRadius: 0,
        },
      },
    };

    const chartOption = {
      options: options,
    };
    setChartOptions(chartOption);

    async function getGrowthStockData() {
      const { data: growthStocks } = await getGrowthTechStocks();
      const { data: std } = await getStockData(sym);
      setStockData(std);
      setModifiedStocks(growthStocks.slice(0, 6));
    }

    getGrowthStockData();
  }, [sym]);

  console.log(stockData);

  return (
    <React.Fragment>
      <div className="container h-screen mx-auto bg-gray-300/50">
        <Navbar />

        <div className="flex flex-row h-auto p-2 py-4 gap-7 justify-center bg-gray-50">
          <StockCardMini />
          <StockCardMini />
          <StockCardMini />
          <StockCardMini />
          <StockCardMini />
        </div>

        <div className="container relative p-4 bg-gray-100">
          <Searchbar />
        </div>

        <div className="container p-3 h-auto bg-red-100">
          <div className="container p-2 h-full w-3/4 mx-auto bg-red-200">
            <div className="flex flex-nowrap pb-3">
              <div className="basis-3/4 flex flex-col pl-10 h-auto p-2 bg-white divide-y-2 divide-gray-200">
                <div className="inline-block p-2 font-semibold text-2xl">
                  {stockData.quote.shortName}
                </div>
                <div className="inline-block py-2 text-4xl font-semibold">
                  ${stockData.quote.regularMarketPrice}
                </div>
                <div className="container py-4">
                  Graph
                  <Line
                    id="canvas"
                    data={data}
                    width={350}
                    height={150}
                    options={chartOptions.options}
                  />
                </div>
              </div>
              <div className="basis-1/4 h-auto p-2 bg-white">
                <SideBlock />
              </div>
            </div>
            <div className="container bg-blue-100 p-3">About Section</div>
            <div className="inline-block w-full bg-white pl-4 pt-3 text-xl font-semibold">
              You might Like:
            </div>
            <div className="flex flex-row h-auto p-2 py-4 gap-7 bg-gray-50 justify-center">
              {modifiedStocks.map((stock) => (
                <StockCard stock={stock} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StockPage;

/*  {stockData.quote.shortName}
{stockData.quote.regularMarketPrice}*/
