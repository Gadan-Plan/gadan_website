"use client";
import React, { useState, useEffect } from "react";
import { getCurrentMonth } from "@/utils/common/dateUtil";
import Rank from "./rank";
import EchartsPart from "./charts";
import ViolationPart from "./violation";
import RankHistroy from "./rankHistroy";
import { Card, Space, ConfigProvider, DatePicker } from "antd";
import Image from "next/image";
import "./ui/statistics.css";
import type { DatePickerProps, GetProps } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const statisticsPage = () => {
  console.log(getCurrentMonth());
  const [awardsTime, setAwardsTime] = useState<[start: Dayjs, end: Dayjs]>([
    dayjs(getCurrentMonth()[0]),
    dayjs(getCurrentMonth()[1]),
  ]);
  useEffect(() => {
    console.log("statisticsPage useEffect");
  }, []);
  const chooseAwaidsTime = (value: any) => {
    console.log("clickmapData", value);
    setAwardsTime(value);
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
            />
          </div>
          <div className="text-white pl-12 text-xs">
            上月平台共收到捐赠$233，激励计划发放$200,详情查看（外部公共钱包链接）
          </div>
          <Card title="本月排行" extra={<a href="#">查看更多</a>}>
            <Rank></Rank>
          </Card>
          <Card
            title="激励明细"
            extra={
              <div>
                <RangePicker
                  allowClear={false}
                  value={awardsTime}
                  onChange={chooseAwaidsTime}
                ></RangePicker>
              </div>
            }
          >
            <RankHistroy selectTime={awardsTime}></RankHistroy>
          </Card>

          <Card title="噶蛋分布图" extra={<a href="#">More</a>}>
            <EchartsPart />
          </Card>
        </Space>
      </ConfigProvider>
    </div>
  );
};

export default statisticsPage;
