export type PassStatus = {
  passed: boolean;
};

export type MarketNews = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  guid: string;
};

export type StockMini = {
  percent: string;
  price: string;
  symbol: string;
  name: string;
};

export type MarketMoverStock = {
  netChange: number;
  volume: number;
  ticker: string;
  performanceId: string;
  name: string;
  exchange: string;
  percentNetChange: number;
  lastPrice: number;
};

export type MarketMovers = {
  actives: MarketMoverStock[];
  losers: MarketMoverStock[];
  gainers: MarketMoverStock[];
};

export type MoverType = "Actives" | "Gainers" | "Losers";
export type Range = "1D" | "5D" | "1M";

export type Stock = {
  symbol: string;
  shortName: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
};

export type AutoComplete = {
  symbol: string;
  name: string;
  exch: string;
  type: string;
  exchDisp: string;
  typeDisp: string;
};

export type WatchlistStock = {
  stockName: string;
  stockPercentChange: number;
  stockPrice: number;
  stockSymbol: string;
};

export type StockData = {
  underlyingSymbol: string;
  quote: Stock;
};

export type BioData = {
  longBusinessSummary: string;
};

export type GraphEpochData = {
  date: string;
  close: number;
  volume: number;
};

export type GrowthTechStocks = Stock[];

export interface MainProps {
  marketMovers: MarketMovers;
  popularStocks: Stock[];
  marketNews: MarketNews[];
}

export interface NewsProps {
  news: MarketNews[];
}

export interface WatchList {
  watchlist: WatchlistStock[];
}

export interface TableProps extends WatchList {
  marketMovers: MarketMovers;
}

export interface TableRowProps extends WatchList {
  stock: MarketMoverStock;
  color: string;
}

export interface SideBlockProps extends WatchList {}

export interface StockCardProps extends WatchList {
  stock: Stock;
}

export interface CheckButtonProps extends WatchList {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export interface StockMainProps {
  stockData: StockData;
  graphData: GraphData;
  bio: BioData;
  growthStocks: GrowthTechStocks;
}

export interface GraphProps {
  graphData: GraphEpochData[];
}
