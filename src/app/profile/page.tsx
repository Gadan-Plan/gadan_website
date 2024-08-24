"use client";
import React, { useState, useEffect, useRef } from "react";
import { Tooltip, Modal, Button, ConfigProvider } from "antd";
import { getPersonalDetails } from "@/api/user";
import type { UserApi } from "@/api/user";
import { WarningTwoTone } from "@ant-design/icons";

import Image from "next/image";
import "./profile.css";
import DescribeImg from "@/app/component/describeImg";
const initUserData: UserApi.Record = {
  realName: "",
  address: [],
  awardsDetails: [],
  pets: [],
};
const profilePage = (params: { id: String }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserApi.Record>(initUserData);
  const [currentCats, setCurrentCats] = useState<UserApi.Pet>({
    quillContent: [],
  });
  const point = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result: UserApi.Record = await getPersonalDetails();
        console.log("result", result);

        setUserData(result);
        setCurrentCats(result.pets[0]);
      } catch (error) {
        console.error("Failed to fetch ranking:", error);
      }
    };

    fetchUser(); // 调用函数以获取数据
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 3000);
  };
  const choosePets = (index: number) => {
    setCurrentCats(userData.pets[index]);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [reportData, setReportData] = useState({
    reportText: undefined,
    reportImgIds: [],
    reportImgUrls: [],
  });
  const handleDescriptionChange = (details, type) => {
    if (type == "word") {
      setReportData({
        reportText: details,
        reportImgUrls: reportData.reportImgUrls,
        reportImgIds: reportData.reportImgIds,
      });
    } else {
    }
  };
  return (
    <div className="userPage">
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
                <div className="ml-1 text-lg font-bold">TA的NFT</div>
              </div>
              <div className="flex flex-wrap">
                {userData.pets.map((item, index) => {
                  return (
                    <div
                      className="flex flex-col items-center m-2.5"
                      key={index}
                    >
                      <Image
                        width={60}
                        alt=""
                        height={60}
                        className="rounded-md"
                        src="/img/caicai.png"
                      />
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
                      className="flex flex-col items-center m-2.5 cursor-pointer"
                      key={index}
                      onClick={() => choosePets(index)}
                    >
                      <Image
                        width={60}
                        alt=""
                        height={60}
                        className="rounded-md"
                        src="/img/caicai.png"
                      />
                      <div>
                        {item.name}
                        {item.inQuestion && (
                          <WarningTwoTone twoToneColor="#f1330d" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="user-content-right h-full flex justify-between">
              <div className="user-content-point-group w-11"></div>
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
                  <div className=" flex justify-between">
                    <div className="text-lg font-bold">猫猫档案</div>
                    <div
                      className="flex items-center cursor-grabbing "
                      onClick={showModal}
                    >
                      <Image
                        width={12}
                        alt=""
                        height={12}
                        src="/img/icon_jubao@2x.png"
                      />
                      <div className="ml-1" style={{ color: "#9C9B99" }}>
                        举报
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="user-pets-card main-family text-lg">
                      <div className="w-1/2 flex flex-col items-center">
                        <Image
                          width={80}
                          alt=""
                          height={80}
                          style={{ height: "80px" }}
                          className="rounded-md"
                          src="/img/caicai.png"
                        />
                        <div className="my-2 flex">
                          <Tooltip
                            title="该猫猫存疑"
                            placement="bottom"
                            color={"rgba(241, 51, 13, 0.5)"}
                          >
                            <div className="pets-question">?</div>
                          </Tooltip>

                          <div>菜菜 </div>
                          <div className=" inline-block main-color">
                            [已放归]
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div>性别:母</div>
                        <div>籍贯:中国 宁波市</div>
                        <div>性格:温柔 爱撒娇</div>
                        <div>生日:2021-09-12</div>
                        <div>绝育日:2021-09-12</div>
                        <div>档案成立:2021-09-21</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <div className="text-lg font-bold">日常记录</div>
                  <div className="mt-5  ">
                    {currentCats.quillContent &&
                      currentCats.quillContent?.map((item, index) => {
                        return (
                          <div className="" key={index}>
                            <div className="user-pets-details flex ">
                              <div className="user-pets-details-line ">
                                <div className="user-pets-line-top"></div>
                                <div className="user-pets-line-under"></div>
                              </div>
                              <div className="user-pets-details-des">
                                <div>{item.contentText}</div>
                                <div className="flex">
                                  {item.contentImgUrls &&
                                    item.contentImgUrls?.map(
                                      (children, chilrenIndex) => {
                                        return (
                                          <div
                                            key={chilrenIndex}
                                            className="mx-2"
                                          >
                                            <Image
                                              width={100}
                                              alt=""
                                              height={100}
                                              src={children}
                                            />
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                                <div className="text-end">{item.creatTime}</div>
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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FFA940",
            borderRadius: 25,
          },
        }}
      >
        <Modal
          title="举报原因"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              提交
            </Button>,
          ]}
        >
          <DescribeImg
            onDescriptionChange={handleDescriptionChange}
          ></DescribeImg>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default profilePage;
