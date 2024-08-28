"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, ConfigProvider, Row, Col } from "antd";
import Image from "next/image";
import "./user.css";
import Link from "next/link";
import type { GetProps } from "antd";
import { getUser } from "@/api/user";
import type { Data } from "@/api/user";
import type { Pet } from "@/api/dataType";
const userPage = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [searchLoading, setSearchLoading] = useState(false);
  const onSearch = async (value: any) => {
    console.log(value);

    setSearchLoading(true);
    setSearchValue(value);
    const result: Data = await getUser({
      searchName: value,
      current: 1,
      size: 9999,
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
    setuserList(allResult);
    setSearchLoading(false);
  };

  const [userList, setuserList] = useState<any>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result: Data = await getUser({
          current: 1,
          size: 9999,
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
        setuserList(allResult);
      } catch (error) {
        console.error("Failed to fetch ranking:", error);
      }
    };

    fetchUser(); // 调用函数以获取数据
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFA940",
          borderRadius: 25,
        },
      }}
    >
      <div className="flex justify-center">
        <div className="user-header-search">
          <Input value={searchValue} className="user-header-input"></Input>
          <Button type="primary" loading={searchLoading} onClick={onSearch}>
            查询
          </Button>
        </div>
      </div>

      <div className="flex justify-center ">
        <div className="bg-white rounded-3xl mt-5 mb-8 searchResult">
          <div className="text-lg">搜索结果({userList.length})</div>
          <div>
            {userList.map((item: any, index: number) => {
              return (
                <Link href={`/user/${item.id}`} key={index}>
                  <div
                    className="flex  justify-between py-7"
                    style={{ borderBottom: "1px solid #F3F3F3" }}
                  >
                    <div className="flex items-center w-4/12">
                      <Image
                        width={80}
                        alt=""
                        height={80}
                        className="rounded-full"
                        src="/img/header.jpg"
                      />
                      <div className="ml-4">
                        <div className="text-lg font-bold">{item.realName}</div>
                        <div className="text-sm" style={{ color: "#6D7280" }}>
                          {item.address}
                        </div>
                        <div className="text-sm" style={{ color: "#6D7280" }}>
                          猫猫数量:{item.petsNum}
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-around">
                      {item.pets &&
                        item.pets.map((petItem: Pet, petIndex: number) => {
                          return (
                            <div
                              key={petIndex}
                              className="w-14 flex flex-col items-center"
                            >
                              <Image
                                width={50}
                                alt=""
                                height={50}
                                className="rounded-lg"
                                src="/img/caicai.png"
                              />
                              <div className="">{petItem.name}</div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default userPage;
