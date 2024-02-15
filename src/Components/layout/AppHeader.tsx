import { Button, Drawer, Modal, Select, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { cryptoData } from "../../data";
import FormDrawwer from "../FormDrawwer";
import CoinInfoModal from "../CoinInfoModal";
import { useAppSelector } from "../../hooks";
import { ICoin } from "../../interfaces";

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#223344",
};

const initialState: ICoin = {
  id: "",
  icon: "",
  name: "",
  symbol: "",
  rank: 0,
  price: 0,
  priceBtc: 0,
  volume: 0,
  marketCap: 0,
  availableSupply: 0,
  totalSupply: 0,
  priceChange1h: 0,
  priceChange1d: 0,
  priceChange1w: 0,
  redditUrl: "",
  websiteUrl: "",
  twitterUrl: "",
  explorers: [],
};

export default function AppHeader({ crypto }) {
  const [select, setSelect] = useState(false);
  const [nameCoinModal, setNameCoinModal] = useState<ICoin | undefined>(
    initialState
  );
  const [nameCoin, setNameCoin] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawwer, setOpenDrawwer] = useState(false);

  const cryptoResult = useAppSelector(
    (state) => state.cryptoResult.cryptoResult
  );
  console.log(nameCoinModal);
  useEffect(() => {
    const keyPress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keyPress);
    return () => document.removeEventListener("keypress", keyPress);
  }, []);

  const handdleSelect = (value) => {
    setNameCoinModal(cryptoResult?.find((c) => c.name === value));
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpenDrawwer(true);
  };

  const onClose = () => {
    setOpenDrawwer(false);
    setSubmitted(false);
    setNameCoin("");
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <CoinInfoModal nameCoin={nameCoinModal} />
      </Modal>
      <Drawer
        title="Add Asset"
        onClose={onClose}
        open={openDrawwer}
        size="large"
      >
        <FormDrawwer
          crypto={crypto}
          submitted={submitted}
          setSubmitted={setSubmitted}
          onClose={onClose}
          nameCoin={nameCoin}
          setNameCoin={setNameCoin}
        />
      </Drawer>
      <Header style={headerStyle}>
        <Select
          style={{ width: "250px", height: "40px", color: "black" }}
          open={select}
          onSelect={handdleSelect}
          onClick={() => setSelect((prev) => !prev)}
          optionLabelProp="label"
          value="press / to open"
          options={cryptoData.result.map((coin) => ({
            label: coin.name,
            value: coin.name,
            icon: coin.icon,
          }))}
          optionRender={(option) => (
            <Space>
              <img
                style={{ width: "30px" }}
                src={option.data.icon}
                alt={option.data.label}
              />{" "}
              {option.data.label}
            </Space>
          )}
        />
        <Button
          style={{
            width: "150px",
            height: "40px",
            borderRadius: "50px",
            backgroundColor: "silver",
          }}
          onClick={showDrawer}
        >
          Add Asset
        </Button>
      </Header>
    </>
  );
}
