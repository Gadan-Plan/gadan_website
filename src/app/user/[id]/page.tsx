"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, ConfigProvider, Row, Col } from "antd";
import { getUserById } from "@/api/user";
import type { UserApi } from "@/api/user";
import Image from "next/image";
import "../user.css";
const initUserData: UserApi.Record = {
  realName: "",
  address: [],
  awardsDetails: [],
  pets: [],
};
const UserDetails = (params: { id: String }) => {
  const [userData, setUserData] = useState<UserApi.Record>(initUserData);
  const point = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result: UserApi.Record = await getUserById({ id: params.id });
        console.log("result", result);
        result.pets = result.pets
          .concat(result.pets)
          .concat(result.pets)
          .concat(result.pets);
        result.awardsDetails = result.awardsDetails
          .concat(result.awardsDetails)
          .concat(result.awardsDetails)
          .concat(result.awardsDetails);
        setUserData(result);
      } catch (error) {
        console.error("Failed to fetch ranking:", error);
      }
    };

    fetchUser(); // 调用函数以获取数据
  }, []);
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
        <div className="flex justify-center">
          <div className="flex mt-5">
            <div className="user-content-left p-10">
              <div
                className="flex flex-col items-center pb-7"
                style={{ borderBottom: "1px solid #F3F3F3" }}
              >
                <Image
                  width={120}
                  alt=""
                  className="rounded-full"
                  height={120}
                  src="/img/header.jpg"
                />
                <div className=" text-xl font-bold mt-5 mb-2.5">
                  {userData.realName}
                </div>
                <div style={{ color: "#6D7280" }}>
                  {userData.address.join(" ")}
                </div>
                <div className="break-all">
                  钱包地址:0x84030aDE17E52247aE36ba625EB8f7019CbBd2dA
                </div>
              </div>

              <div>
                <div className="flex items-center mt-6">
                  <Image
                    width={14}
                    alt=""
                    height={18}
                    src="/img/icon_rongyu@2x.png"
                  />
                  <div className="ml-1 text-lg font-bold">获得激励</div>
                </div>
                <div className="max-h-96 overflow-y-scroll mt-2.5">
                  {userData.awardsDetails.map((item, index) => {
                    return (
                      <div className="user-awards-card" key={index}>
                        <div>
                          {item.awardMonth.split("-")[0]}年
                          {item.awardMonth.split("-")[1]}月 “{item.title}” 第
                          <span className="font-bold text-sm main-color">
                            {item.rank}
                          </span>
                          名
                        </div>
                        <div>获得 {item.awardsPNC}噶蛋值</div>
                        {item.awardsToken && (
                          <div>
                            获得
                            <a
                              href={item.donationLink}
                              className="text-amber-500 underline hover:underline hover:text-amber-500 "
                            >
                              {item.donationOwner}
                            </a>{" "}
                            捐赠的:{item.awardsToken}
                            {item.awardsTockenType}
                          </div>
                        )}
                        {item.otherDonation && (
                          <div>获得{item.otherDonation}</div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center mt-6">
                  <Image
                    width={16}
                    alt=""
                    height={18}
                    src="/img/icon_cat@2x(1).png"
                  />
                  <div className="ml-1 text-lg font-bold">TA的猫猫</div>
                </div>
                <div className="flex flex-wrap">
                  {userData.pets.map((item, index) => {
                    return (
                      <div
                        className="flex flex-col items-center m-2.5 "
                        key={index}
                      >
                        <Image
                          width={60}
                          alt=""
                          height={60}
                          className="rounded-md"
                          src="/img/caicai.png"
                        />
                        <div>{item.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="user-content-right h-full flex justify-between">
                <div className="user-content-point-group w-11">
                  {point.map((_, index) => {
                    return (
                      <div className="" key={index}>
                        <div className="user-content-point"></div>
                      </div>
                    );
                  })}
                </div>
                <div className="user-content-point-right">
                  <div className="user-content-right-top">
                    <Image
                      width={14}
                      alt=""
                      height={14}
                      className="rounded-lg"
                      src="/img/icon_talk@2x.png"
                    />
                    <div
                      style={{
                        color: "#854318",
                        fontFamily: "MuyaoFont",
                        fontSize: "1.1rem",
                        marginRight: "20px",
                      }}
                    >
                      我有话讲:
                    </div>
                    <div>小橘求领养，有意者联系：13999928</div>
                  </div>

                  <div className="p-7">
                    <div className="text-xl  main-family main-color">
                      猫猫档案
                    </div>
                    <div className="mt-5">
                      <div className="user-pets-card">
                        <div className="w-1/2 flex flex-col items-center">
                          <Image
                            width={50}
                            alt=""
                            height={50}
                            style={{ height: "50px" }}
                            className="rounded-full"
                            src="/img/caicai.png"
                          />
                          <div>菜菜</div>
                          <div>中国 宁波市</div>
                        </div>
                        <div className="w-1/2">
                          <div>已放归</div>
                          <div>性格：温柔 爱撒娇</div>
                          <div>生日：2021-09-12</div>
                          <div>绝育日：2021-09-12</div>
                          <div>性别：母</div>
                          <div>档案建立日期：2021-09-21</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="text-lg font-bold">日常记录</div>
                    <div className="mt-5">
                      {userData.pets.map((item, index) => {
                        return (
                          <div className="" key={index}>
                            <div className="user-pets-details flex ">
                              <div className="user-pets-details-line ">
                                <div className="user-pets-line-top"></div>
                                <div className="user-pets-line-under"></div>
                              </div>
                              <div className="user-pets-details-des">
                                <div className="flex justify-between w-full">
                                  <div>2024年3月7号 绝育猫猫：妙妙</div>
                                  <div>举报</div>
                                </div>
                                <div>猫猫姓名：xx</div>
                                <div>猫猫描述：xxxx</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className=" absolute left-5 top-0 w-full h-full"
                style={{
                  backgroundColor: "#FBBF4F",
                  width: "830px",
                  borderRadius: "20px",
                  zIndex: 0,
                }}
              ></div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default UserDetails;
