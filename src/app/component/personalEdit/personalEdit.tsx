"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import {
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  message,
  ColorPicker,
  Col,
  Row,
  Radio,
  ConfigProvider,
  Cascader,
} from "antd";
import type { GetProp, UploadProps } from "antd";
import type { selectType, applicationForm } from "./type";
import "react-quill/dist/quill.snow.css";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import addressOption from "@/utils/address/provinces-cities.json";
import { useTranslation } from "react-i18next";
import countryOptions from "@/utils/address/country.json";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
interface Props {
  onChangePersonal: Function;
}
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const PersonalEdit: React.FC<Props> = ({ onChangePersonal }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fromData, setFromData] = useState<applicationForm>({
    userHeaderUrl: "",
    userHeaderId: "",
    realName: "",
    country: "",
    advertisement: "", //我有话讲
    address: [],
    walletAddres: "",
    jobName: "",
  });

  useEffect(() => {
    //   console.log(dayjs(new Date()).format('YYYY-MM-DD'));
  }, []);
  //
  const changeHeaderUrl: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        fromData.headerImageUrl = url;
      });
    }
  };

  return (
    <>
      <div className="flex py-20 relative  justify-center">
        <div className={styles.applicationForm}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FFA940",
                borderRadius: 21,
              },
            }}
          >
            <Row className="my-3.5">
              <Col span={4}>
                <span className="text-red-500">*</span> <span>头像: </span>
              </Col>
              <Col span={12}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={changeHeaderUrl}
                >
                  {fromData.userHeaderUrl ? (
                    <Image
                      src={fromData.userHeaderUrl}
                      alt="avatar"
                      width={300}
                      height={300}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    </button>
                  )}
                </Upload>
              </Col>
            </Row>

            <Row className="my-3.5">
              <Col span={4}>
                <span className="text-red-500">*</span>
                <span>昵称: </span>
              </Col>
              <Col span={12}>
                <Input
                  placeholder="请输入"
                  value={fromData.realName}
                  onChange={(e) => {
                    setFromData((prevFromData: applicationForm) => ({
                      ...prevFromData,
                      realName: e.target.value,
                    }));
                    onChangePersonal(fromData);
                  }}
                ></Input>
              </Col>
            </Row>
            <Row className="my-3.5">
              <Col span={4}>
                <span>国家: </span>
              </Col>
              <Col span={12}>
                <Select
                  style={{ width: "100%" }}
                  value={fromData.country}
                  placeholder="please select"
                  options={countryOptions}
                  allowClear={false}
                  showSearch
                  onChange={(e: any) => {
                    setFromData((prevFromData: applicationForm) => ({
                      ...prevFromData,
                      country: e,
                    }));
                  }}
                />
              </Col>
            </Row>
            {fromData.country == "CN" && (
              <Row className="my-3.5">
                <Col span={4}>
                  <span>地址: </span>
                </Col>
                <Col span={12}>
                  <Cascader
                    style={{ width: "100%" }}
                    options={addressOption}
                    value={fromData.address}
                    allowClear={false}
                    placeholder="please choose"
                    onChange={(e) => {
                      console.log(e);
                      setFromData((prevFromData: applicationForm) => ({
                        ...prevFromData,
                        address: e,
                      }));
                    }}
                  />
                </Col>
              </Row>
            )}
            <Row className="my-3.5">
              <Col span={4}>
                <span>职业: </span>
              </Col>
              <Col span={12}>
                <Input
                  placeholder="请输入"
                  value={fromData.jobName}
                  onChange={(e) => {
                    setFromData((prevFromData: applicationForm) => ({
                      ...prevFromData,
                      jobName: e.target.value,
                    }));
                  }}
                ></Input>
              </Col>
            </Row>
            <Row className="my-3.5">
              <Col span={4}>
                <span>我有话讲: </span>
              </Col>
              <Col span={12}>
                <Input
                  placeholder="请输入"
                  value={fromData.advertisement}
                  onChange={(e) => {
                    setFromData((prevFromData: applicationForm) => ({
                      ...prevFromData,
                      advertisement: e.target.value,
                    }));
                  }}
                ></Input>
              </Col>
            </Row>
            <Row className="my-3.5">
              <Col span={4}>
                <span>钱包地址: </span>
              </Col>
              <Col span={12}>
                <Input
                  placeholder="请输入"
                  value={fromData.walletAddres}
                  onChange={(e) => {
                    setFromData((prevFromData: applicationForm) => ({
                      ...prevFromData,
                      walletAddres: e.target.value,
                    }));
                  }}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col span={4}></Col>
              <Col span={12} className="flex ">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#FFA940",
                      borderRadius: 21,
                    },
                  }}
                ></ConfigProvider>
              </Col>
            </Row>
          </ConfigProvider>
        </div>
        <Image
          src="/img/bg_bottom@2x.png"
          className="absolute  z-10 bottom-0 right-0  "
          alt=""
          width={3840}
          height={2802}
          layout="responsive"
        />
        <Image
          src="/img/bg_top_bottom@2x.png"
          className="absolute  z-10 bottom-0 left-0 "
          alt=""
          width={3840}
          height={394}
          layout="responsive"
        />
        <Image
          src="/img/bg_top_left@2x.png"
          className="absolute z-10 top-0 left-0 w-1/4"
          width={742}
          height={454}
          alt=""
          // layout="responsive"
        />
        <Image
          src="/img/bg_top_right@2x.png"
          className="absolute  z-10  top-0 right-0  w-1/4"
          alt=""
          width={730}
          height={536}
          // layout="responsive"
        />
      </div>
    </>
  );
};

export default PersonalEdit;
