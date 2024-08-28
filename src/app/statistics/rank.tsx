// "use client";
import React, { useState, useEffect } from "react";
import { getRanking } from "@/api/rank";
import type { RankRecord, Data } from "@/api/rank";
import { getCurrentMonth } from "@/utils/common/dateUtil";
import Image from "next/image";
import "./ui/statistics.css";
function RankPart() {
  const [rankingData, setRankingData] = useState<[RankRecord[], RankRecord[]]>([
    [],
    [],
  ]);
  useEffect(() => {
    console.log("useEffect is running");
    const fetchRanking = async () => {
      try {
        const result: Data = await getRanking({
          rankBeginDate: getCurrentMonth()[0],
          rankEndDate: getCurrentMonth()[1],
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
        setRankingData([allResult.slice(0, 5), allResult.slice(-5)]);
      } catch (error) {
        console.error("Failed to fetch ranking:", error);
      }
    };

    fetchRanking(); // 调用函数以获取数据
  }, []);

  return (
    <div className="px-2 flex justify-between items-stretch">
      <div className="w-6/12 rank-line-left">
        {rankingData[0].map((item: RankRecord, index) => {
          return (
            <div className="flex  justify-between" key={index}>
              <div className="flex items-center w-8/12">
                <Image
                  width={20}
                  alt=""
                  height={17}
                  src="/img/icon_first@2x.png"
                />
                <Image
                  width={50}
                  alt=""
                  height={50}
                  src="/img/header.jpg"
                  className="rank-header"
                />
                <div className="w-6/12">
                  <div>{item.realName}</div>
                  <div>{item.address}</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3">本月绝育数量：{item.addCatsNumber}</div>
                <Image
                  width={16}
                  alt=""
                  height={12}
                  src="/img/icon_see@2x.png"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="  w-6/12 rank-line-right">
        {rankingData[1].map((item: RankRecord, index) => {
          return (
            <div className="flex  justify-between" key={index}>
              <div className="flex items-center w-8/12">
                <Image
                  width={20}
                  alt=""
                  height={17}
                  src="/img/icon_first@2x.png"
                />
                <Image
                  width={50}
                  alt=""
                  height={50}
                  src="/img/header.jpg"
                  className="rank-header"
                />
                <div className="w-6/12">
                  <div>{item.realName}</div>
                  <div>{item.address}</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3">本月绝育数量：{item.addCatsNumber}</div>
                <Image
                  width={16}
                  alt=""
                  height={12}
                  src="/img/icon_see@2x.png"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RankPart;
