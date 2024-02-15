import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import AppHeader from "./Components/layout/AppHeader";
import AppContent from "./Components/layout/AppContent";
import AppSider from "./Components/layout/AppSider";
import { percentDifference } from "./utils";
import { ICoin, IMyCoinFull } from "./interfaces";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchResultCryptoMarcet } from "./store/ResultCryptoMarcetSlice";

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
  const [crypto, setCrypto] = useState<ICoin[]>([]);
  const [myCoin, setMyCoin] = useState<IMyCoinFull[]>([initialState]);

  const dispatch = useAppDispatch();
  const myCrypt = useAppSelector((state) => state.myCrypto.myCrypto);
  const cryptoResult = useAppSelector(
    (state) => state.cryptoResult.cryptoResult
  );

  function mapAssets(myCrypt, cryptoResult) {
    return myCrypt.map((asset) => {
      const coin = cryptoResult?.find((c) => c.id === asset.id);
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
    dispatch(fetchResultCryptoMarcet());
  }, [dispatch]);

  useEffect(() => {
    async function preload() {
      setIsLoading(true);

      setMyCoin(mapAssets(myCrypt, cryptoResult));
      setCrypto(cryptoResult);
      setIsLoading(false);
    }
    preload();
  }, [myCrypt]);

  return (
    <Layout>
      <AppHeader crypto={crypto} />
      <Layout>
        <AppContent myCoin={myCoin} />
        <AppSider isLoading={isLoading} myCoin={myCoin} />
      </Layout>
    </Layout>
  );
}
