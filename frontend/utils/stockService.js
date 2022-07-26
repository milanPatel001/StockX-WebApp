import http from "./httpService";

export function getStocks() {
  return http.get("http://localhost:3000/api/stocks");
}

export function getRandomStocks() {
  return http.get("http://localhost:3000/api/stocks/random");
}

export function getStockData(symbol) {
  return http.get("http://localhost:3000/api/stocks/" + symbol);
}

export function getPopularStocks() {
  return http.get("http://localhost:3000/api/stocks/popular");
}

export function getSimilarStocks(symbol) {
  return http.get("http://localhost:3000/api/stocks/similar/" + symbol);
}

export function getGrowthTechStocks() {
  return http.get("http://localhost:3000/api/stocks/growthTechStocks");
}

export function getTrendingStocks() {
  return http.get("http://localhost:3000/api/stocks/trending");
}

export function autoComplete(input) {
  return http.get("http://localhost:3000/api/stocks/autocomplete/" + input);
}

export function getMarketMovers() {
  return http.get("http://localhost:3000/api/stocks/market_movers");
}

export function getMarketNews() {
  return http.get("http://localhost:3000/api/stocks/marketNews");
}

export function getWatchlist() {
  return http.get();
}

export function getBio(symbol) {
  return http.get("http://localhost:3000/api/stocks/bio/" + symbol);
}

export function getGraphData(symbol, period = "1d") {
  return http.get(
    "http://localhost:3000/api/stocks/stockGraph/" + symbol + "/" + period
  );
}

export function graphDataConverter(epoch) {
  const result = {
    date: epochConverter(epoch).date,
    time: epochConverter(epoch).time,
    volume: epoch.volume,
    close: epoch.close,
  };
  return result;
}

function epochConverter(epoch) {
  const date = new Date(epoch * 1000);
  const result = {
    time: date.toLocaleTimeString("en-US", { timeStyle: "short" }),
    date: date.toLocaleDateString("en-US", { dateStyle: "medium" }),
  };
  return result;
}
