import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import AppHeader from "./Components/layout/AppHeader";
import AppContent from "./Components/layout/AppContent";
import AppSider from "./Components/layout/AppSider";
import { FetchAssets, fakeFetchCrypto } from "./api";
import { percentDifference } from "./utils";
import { IMyCoin, IMyCoinFull } from "./interfaces";
import { useSelector } from "react-redux";
import { useAppSelector } from "./hooks";

const initialState: IMyCoinFull = {
  id: "",
  amount: 0,
  price: 0,
  date: "",
  name: "",
  growPrecent: 0,
  totalAmount: 0,
  totalProfit: 0,
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [myCoin, setMyCoin] = useState<IMyCoinFull[]>([initialState]);

  const myCrypt = useAppSelector((state) => state.myCrypto.myCrypto);

  function mapAssets(myCrypt, result) {
    return myCrypt.map((asset) => {
      const coin = result?.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPrecent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setIsLoading(true);
      const { result } = await fakeFetchCrypto();
      // const assets = await FetchAssets();
      setMyCoin(mapAssets(myCrypt, result));
      setCrypto(result);
      setIsLoading(false);
    }
    preload();
  }, [myCrypt]);

  return (
    <Layout>
      <AppHeader crypto={crypto} />
      <Layout>
        <AppContent crypto={crypto} myCoin={myCoin} />
        <AppSider isLoading={isLoading} myCoin={myCoin} />
      </Layout>
    </Layout>
  );
}
