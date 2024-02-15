import { Card, Layout, List, Statistic, Tag, Typography } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { FetchAssets, fakeFetchCrypto } from "../../api";
import { capitalize, percentDifference } from "../../utils";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { IMyCoin } from "../../interfaces";
import { useAppDispatch } from "../../hooks";
import { removeMyCrypto } from "../../store/CryptoSlice";

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#223344",
};

export default function AppSider({ isLoading, myCoin }) {
  // const myCrypt = useAppSelector((state: IMyCoin) => state.myCrypto);
  // console.log(myCoin);
  const dispatch = useAppDispatch();

  // Удаление Моей Монеты из стора
  const handleRemoveCard = (id) => {
    dispatch(removeMyCrypto(id));
  };

  if (isLoading) return <Spin fullscreen />;
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {myCoin?.map((coin) => (
        <Card
          key={coin.id}
          style={{ marginTop: "1rem" }}
          extra={
            <DeleteOutlined
              style={{ fontSize: "18px" }}
              onClick={() => handleRemoveCard(coin.id)}
            />
          }
          title={capitalize(coin.id)}
        >
          <Statistic
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
