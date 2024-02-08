import { Card, Layout, List, Statistic, Tag, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { FetchAssets, fakeFetchCrypto } from "../../api";
import { capitalize, percentDifference } from "../../utils";
import { Spin } from "antd";

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#223344",
};

export default function AppSider({ isLoading, myCoin }) {
  if (isLoading) return <Spin fullscreen />;
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {myCoin?.map((coin) => (
        <Card key={coin.id} style={{ marginTop: "1rem" }}>
          <Statistic
            title={capitalize(coin.id)}
            value={coin.totalAmount}
            precision={2}
            valueStyle={{ color: coin.grow ? "#3f8600" : "#cf1322" }}
            prefix={coin.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: "Total Profit", value: coin.totalProfit, withTag: true },
              { title: "Asset Amount", value: coin.amount, isPlan: true },
              // { title: "Difference", value: coin.growPrecent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={coin.grow ? "green" : "red"}>
                      {coin.growPrecent}%
                    </Tag>
                  )}
                  {item.isPlan && <span>{item.value}</span>}
                  {!item.isPlan && (
                    <Typography.Text type={coin.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
