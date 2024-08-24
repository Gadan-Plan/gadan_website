// "use client";
import React, { useState, useEffect } from "react";
import { getAwards } from "@/api/rank";
import type { RankApi } from "@/api/rank";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Image from "next/image";
import "./ui/statistics.css";
const tableWidth = 120;
const tableColumns = [
  {
    dataIndex: "username",
    key: "username",
    title: "激励用户",
    width: tableWidth,
  },
  {
    dataIndex: "title",
    key: "title",
    title: "激励标题",
    width: tableWidth,
  },

  {
    dataIndex: "awardMonth",
    key: "awardMonth",
    title: "激励所属时间",
    width: tableWidth,
  },
  {
    dataIndex: "rank",
    key: "rank",
    title: "排名",
    width: tableWidth,
  },
  {
    dataIndex: "awardsPNC",
    key: "awardsPNC",
    title: "奖励的噶蛋币",
    width: tableWidth,
  },
  {
    dataIndex: "walletAddres",
    key: "walletAddres",
    title: "钱包地址",
    width: tableWidth,
  },

  {
    dataIndex: "awardsToken",
    key: "awardsToken",
    title: "奖励的代币",
    width: tableWidth,
  },
  {
    dataIndex: "awardsTockenType",
    key: "awardsTockenType",
    title: "代币种类",
    width: tableWidth,
  },
  {
    dataIndex: "createTime",
    key: "createTime",
    title: "创建时间",
    width: tableWidth,
  },
];
function RankHistroy({ selectTime }) {
  const [awardData, setAwardData] = useState<RankApi.awardsRecord[]>([]);
  useEffect(() => {
    const fetchAwards = async () => {
      console.log("awardEndDate", selectTime);
      try {
        const result: RankApi.Data = await getAwards({
          awardBeginDate: "2024-04-23",
          awardEndDate: "2024-05-23",
          current: 1,
          size: 10,
        });
        console.log("result", result);
        const allResult = result.records
          .concat(result.records)
          .concat(result.records)
          .concat(result.records)
          .concat(result.records)
          .concat(result.records)
          .concat(result.records)
          .concat(result.records);
        console.log("allResult.length", allResult.length);
        setAwardData(allResult);
      } catch (error) {
        console.error("Failed to fetch ranking:", error);
      }
    };

    fetchAwards(); // 调用函数以获取数据
  }, [selectTime]);

  return (
    <div className="px-2">
      <Table columns={tableColumns} dataSource={awardData} />
    </div>
  );
}

export default RankHistroy;
