"use client";
import React, { useState, useEffect } from "react";
import Rank from "./rank";
import EchartsPart from "./charts";
import ViolationPart from "./violation";
import { Card, Space, ConfigProvider } from "antd";
import Image from "next/image";
import "./ui/statistics.css";

const statisticsPage = () => {
  console.log(1);
  useEffect(() => {
    console.log("statisticsPage useEffect");
  }, []);
  const clickmapData = () => {
    console.log("clickmapData");
  };

  return (
    <div className="flex justify-center items-center staticsPage">
      <ConfigProvider
        theme={{
          token: {
            // colorPrimary: "#FFA940",
            borderRadius: 21,
          },
        }}
      >
        <Space direction="vertical" size={16} style={{ width: "1240px" }}>
          <div className="statics-top">
            <Image
              src="/img/bg_static@2x.png"
              width={1186}
              height={422}
              style={{ margin: "0 auto" }}
              alt=""
              // layout="responsive"
            />
          </div>
          <div className="text-white pl-12 text-xs">
            上月平台共收到捐赠$233，激励计划发放$200,详情查看（外部公共钱包链接）
          </div>
          <Card title="本月绝育数量用户排行" extra={<a href="#">More</a>}>
            <Rank></Rank>
          </Card>
          {/* <Card title="本月被举报猫猫" onClick={clickmapData} extra={<a href="#">More</a>}>
          <div >click</div>
            <ViolationPart />
          </Card> */}
          {/* <div className="flex items-center">
                <Image
                  width={20}
                  alt=""
                  height={17}
                  src="/img/icon_bi@2x.png"
                />
                <div className="ml-3">噶蛋币：{item.reward}</div>
              </div> */}
          <Card title="噶蛋分布图" extra={<a href="#">More</a>}>
            <EchartsPart />
          </Card>
        </Space>
      </ConfigProvider>
    </div>
  );
};

export default statisticsPage;
