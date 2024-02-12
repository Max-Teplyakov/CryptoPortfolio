import React, { useRef, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
  Typography,
} from "antd";
import { cryptoData } from "../data";
import { ICoin, IMyCoin } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addMyCrypto } from "../store/CryptoSlice";
import { useSelector } from "react-redux";

type FieldType = {
  amount?: string;
  price?: string;
  total?: string;
};

const validateMessage = {
  required: "${label} is required",
  types: {
    number: "${label} is not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
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

const FormDrawwer = ({
  crypto,
  onClose,
  submitted,
  setSubmitted,
  nameCoin,
  setNameCoin,
}) => {
  const [coin, setCoin] = useState<ICoin>(initialState);
  const assetRef = useRef();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const myCrypt = useAppSelector((state) => state.myCrypto.myCrypto);
  console.log(myCrypt);

  const handdleSelect = (value) => {
    setCoin(crypto.find((c) => c.name === value));
    setNameCoin(value);
  };

  function handleAmount(value) {
    const priceInput = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * priceInput).toFixed(2),
    });
  }

  function handlePrice(value) {
    const amountInput = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amountInput).toFixed(2),
    });
  }

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };

    dispatch(addMyCrypto(newAsset));
    assetRef.current = newAsset;
    setSubmitted(true);
    form.resetFields();
  };

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!nameCoin) {
    return (
      <Select
        style={{ width: "100%", height: "40px", color: "black" }}
        onSelect={handdleSelect}
        optionLabelProp="label"
        value="open List"
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
    );
  }

  return (
    <>
      <Typography.Title>
        <img src={coin.icon} alt={coin.name} />({coin.symbol}) {nameCoin}
      </Typography.Title>
      <Divider />

      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600 }}
        initialValues={{ price: +coin.price.toFixed(2) }}
        onFinish={onFinish}
        // validateMessage={validateMessage}
      >
        <Form.Item<FieldType>
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            placeholder="Enter coin amount"
            onChange={handleAmount}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Price" name="price">
          <InputNumber onChange={handlePrice} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime style={{ width: 350 }} />
        </Form.Item>

        <Form.Item<FieldType> label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormDrawwer;
