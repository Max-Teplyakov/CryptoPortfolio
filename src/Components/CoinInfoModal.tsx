import { Divider, Flex, Tag, Typography } from "antd";
import React from "react";

export default function CoinInfoModal({ nameCoin }) {
  return (
    <>
      <Flex style={{ height: 100 }} align="center" justify="center" gap={30}>
        <img src={nameCoin.icon} alt={nameCoin.name} />
        <Typography.Title>
          ({nameCoin.symbol}) {nameCoin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Flex gap={10}>
        <Typography.Paragraph
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Typography.Text style={{ fontSize: "1.1rem" }} strong>
            1 hour:
          </Typography.Text>
          <Tag
            style={{ fontSize: "1.1rem" }}
            color={nameCoin.priceChange1h > 0 ? "green" : "red"}
          >
            {nameCoin.priceChange1h}%
          </Tag>
        </Typography.Paragraph>
        <Typography.Paragraph
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Typography.Text style={{ fontSize: "1.1rem" }} strong>
            1 day:
          </Typography.Text>
          <Tag
            style={{ fontSize: "1.1rem" }}
            color={nameCoin.priceChange1d > 0 ? "green" : "red"}
          >
            {nameCoin.priceChange1d}%
          </Tag>
        </Typography.Paragraph>
        <Typography.Paragraph
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Typography.Text style={{ fontSize: "1.1rem" }} strong>
            1 week:
          </Typography.Text>
          <Tag
            style={{ fontSize: "1.1rem" }}
            color={nameCoin.priceChange1w > 0 ? "green" : "red"}
          >
            {nameCoin.priceChange1w}%
          </Tag>
        </Typography.Paragraph>
      </Flex>
      <Divider />
      <Typography.Paragraph style={{ fontSize: "1.1rem" }} strong>
        Price:
        <Tag style={{ fontSize: "1.1rem" }} color={"green"}>
          {nameCoin.price.toFixed(2)}$
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph style={{ fontSize: "1.1rem" }} strong>
        Volume:
        <Tag style={{ fontSize: "1.1rem" }} color={"green"}>
          {nameCoin.volume.toFixed(0)}$
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph style={{ fontSize: "1.1rem" }} strong>
        Volume:
        <Tag style={{ fontSize: "1.1rem" }} color={"green"}>
          {nameCoin.websiteUrl}$
        </Tag>
      </Typography.Paragraph>
    </>
  );
}
