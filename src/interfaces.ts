export interface IMyCoinFull {
  id: string;
  amount: number;
  price: number;
  date: string;
  grow?: boolean;
  name: string;
  growPrecent: number;
  totalAmount: number;
  totalProfit: number;
}

export interface IMyCoin {
  id: string;
  amount: number;
  price: number;
  date: string;
}

export interface ICoin {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  redditUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  explorers: string[];
}
