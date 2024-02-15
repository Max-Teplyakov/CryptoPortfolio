import { Layout, Typography } from "antd";
import React from "react";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 64px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#223344",
};

export default function AppContent({ crypto, myCoin }) {
  const cryptoPriceMap = crypto.reduce((acc, item) => {
    acc[item.id] = item.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title style={{ color: "white", marginTop: "2rem" }}>
        Portfolio:{" "}
        {myCoin
          .map((asset) => {
            return asset.amount * cryptoPriceMap[asset.id];
          })
          .reduce((acc, asset) => (acc += asset), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart myCoin={myCoin} />
      <AssetsTable myCoin={myCoin} />
    </Layout.Content>
  );
}
