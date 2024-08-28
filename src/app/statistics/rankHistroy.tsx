import React, { useState, useEffect } from "react";
import { getAwards } from "@/api/rank";
import type { AwardsData } from "@/api/rank";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { AwardsDetail } from "@/api/dataType";
import { Table } from "antd";
import "./ui/statistics.css";

const tableWidth = 120;
const tableColumns = [
  {
    dataIndex: "realName",
    key: "realName",
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
interface Props {
  selectTime: [start: Dayjs, end: Dayjs];
}
const RankHistroy: React.FC<Props> = ({ selectTime }) => {
  const [awardData, setAwardData] = useState<AwardsDetail[]>([]);
  useEffect(() => {
    const fetchAwards = async () => {
      console.log("awardEndDate", selectTime);
      try {
        const result: AwardsData = await getAwards({
          awardBeginDate: dayjs(selectTime[0]).format("YYYY-MM-DD"),
          awardEndDate: dayjs(selectTime[1]).format("YYYY-MM-DD"),
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
};

export default RankHistroy;
