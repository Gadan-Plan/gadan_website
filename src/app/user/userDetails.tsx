"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, ConfigProvider, Row, Col } from "antd";
import Image from "next/image";
import "./user.css";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const userPage = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [searchLoading, setSearchLoading] = useState(false);
  useEffect(() => {}, []);
  const onSearch = (value) => {
    console.log(value);

    setSearchLoading(true);
    setSearchValue(value);
    setTimeout(() => {
      setSearchLoading(false);
    }, 2000);
  };

  return (
    <div className="userPage">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FFA940",
            borderRadius: 25,
          },
        }}
      >
        <div className="user-header">
          <div className="user-header-search">
            <Image
              width={119}
              alt=""
              height={70}
              className="absolute top-2 left-24"
              src="/img/cat01@2x.png"
            />
            <Image
              width={119}
              alt=""
              height={70}
              className="absolute top-24 left-2/4"
              src="/img/cat02@2x.png"
            />
            <Image
              width={224}
              alt=""
              height={117}
              className="absolute right-24 right-24"
              src="/img/cat03@2x.png"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="user-content-body mt-5">
            <Row>
              <Col span={8}>
                <div className="user-content-left">
                  <Image width={50} alt="" height={50} src="/img/header.jpg" />
                  <div>李大胖</div>
                  <div>浙江 宁波</div>
                  <div>钱包地址:0x84030aDE17E52247aE36ba625EB8f7019CbBd2dA</div>
                  <div></div>
                  <div>
                    <Image
                      width={50}
                      alt=""
                      height={50}
                      src="/img/header.jpg"
                    />
                  </div>
                </div>
              </Col>
              <Col span={14}>
                <div className="user-content-right">
                  <Image width={50} alt="" height={50} src="/img/header.jpg" />
                  <div>李大胖</div>
                  <div>浙江 宁波|保姆</div>
                  <div>钱包地址:0x84030aDE17E52247aE36ba625EB8f7019CbBd2dA</div>
                  <div></div>
                  <div>
                    <Image
                      width={50}
                      alt=""
                      height={50}
                      src="/img/header.jpg"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default userPage;
