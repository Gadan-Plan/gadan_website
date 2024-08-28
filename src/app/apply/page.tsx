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
import { addPet } from "@/api/user";
import type { AddPetParams } from "@/api/user";
import type { QuillContent, Description } from "@/api/dataType";
import NFTCanvas from "./logoCreator";
import "react-quill/dist/quill.snow.css";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import addressOption from "@/utils/address/provinces-cities.json";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { formatToDate, getPreAfterMonth } from "@/utils/common/dateUtil";
import countryOptions from "@/utils/address/country.json";
import DescribeImg from "../component/describeImg";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

// function preserveValueAndLabel(data) {
//   return data.map(province => {
//     const { value, label, children } = province;
//     const newProvince = { value, label };
//     if (children) {
//       newProvince.children = children.map(city => {
//         const { value: cityValue, label: cityLabel } = city;
//         return { value: cityValue, label: cityLabel };
//       });
//     }
//     return newProvince;
//   });
// }
// console.log(preserveValueAndLabel(addressOption))
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

const ApplyPage = () => {
  const { t } = useTranslation();
  const [chooseColor, setChooseColor] = useState("#FFA940");
  const [loading, setLoading] = useState(false);
  const [fromData, setFromData] = useState<AddPetParams>({
    gender: "male",
    neuterTime: formatToDate(),
    birthMonth: getPreAfterMonth(-6, "YYYY-MM"),
    status: "1",
    name: "咪咪",
    country: "CN",
    address: ["浙江", "杭州"],
    petHeader: {
      url: "",
      id: "",
    },
    character: ["1"],
  });

  const characterOptions = [
    { value: "1", label: t("basic.character1") },
    { value: "2", label: t("basic.character2") },
    { value: "3", label: t("basic.character3") },
    { value: "4", label: t("basic.character4") },
  ];

  //猫猫标识
  const changeHeaderUrl: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
      });
    }
    getBase64(info.file.originFileObj as FileType, (url) => {
      setLoading(false);
    });
  };

  //提交
  const handleSubmit = () => {
    console.log("handleSubmit", fromData);
    addPet(fromData).then(() => {
      message.success("申请成功");
    });
  };
  const handleDescriptionChange = (dataForm: Description) => {
    setFromData((prevFromData: AddPetParams) => ({
      ...prevFromData,
      quillContent: [
        {
          contentText: dataForm.content,
          contentImgs: dataForm.fileList,
        },
      ],
    }));
  };
  return (
    <>
      <div className="flex py-40 relative  justify-center">
        <div className={styles.applicationForm}>
          <div className="flex">
            <Image
              width={50}
              alt=""
              height={25}
              src="/img/icon_title01@2x.png"
            />
            <div className={styles.applicationFormTitle}>申请中心</div>
          </div>

          <div className={styles.applicationFormTitleEn}>
            <span>Application&nbsp;Center</span>
          </div>

          <Row>
            <Col span={10}>
              <Row className="my-3.5">
                <Col span={7}>
                  <span className="text-red-500">*</span>{" "}
                  <span>{t("apply.figure")}: </span>
                </Col>
                <Col span={7}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#FFA940",
                        borderRadius: 21,
                      },
                    }}
                  >
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className={styles.avatarUploader}
                      showUploadList={false}
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      beforeUpload={beforeUpload}
                      onChange={changeHeaderUrl}
                    >
                      {fromData.petHeader ? (
                        <Image
                          src={fromData.petHeader?.url}
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
                  </ConfigProvider>
                </Col>
                <Col span={4}>
                  <span className="text-red-500">*</span>{" "}
                  <span>{t("apply.tone")}: </span>
                </Col>
                <Col span={4}>
                  <ColorPicker
                    defaultValue="#1677ff"
                    value={chooseColor}
                  ></ColorPicker>
                </Col>
              </Row>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#FFA940",
                    borderRadius: 21,
                  },
                }}
              >
                <Row className="my-3.5">
                  <Col span={7}>
                    <span className="text-red-500">*</span>
                    <span>{t("apply.name")}: </span>
                  </Col>
                  <Col span={14}>
                    <Input
                      placeholder="🐱"
                      value={fromData.name}
                      onChange={(e) => {
                        setFromData((prevFromData: AddPetParams) => ({
                          ...prevFromData,
                          name: e.target.value,
                        }));
                      }}
                    ></Input>
                  </Col>
                </Row>
                <Row className="my-3.5">
                  <Col span={7}>
                    <span className="text-red-500">*</span>
                    <span>{t("apply.sterilizationDay")}: </span>
                  </Col>
                  <Col span={14}>
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="please choose"
                      format={{
                        format: "YYYY-MM-DD",
                      }}
                      allowClear={false}
                      value={dayjs(fromData.neuterTime)}
                      onChange={(date) => {
                        setFromData((prevFromData: AddPetParams) => ({
                          ...prevFromData,
                          neuterTime: dayjs(date).format("YYYY-MM-DD"),
                        }));
                      }}
                    />
                  </Col>
                </Row>
              </ConfigProvider>
            </Col>
            <Col span={12}>
              <NFTCanvas
                base64Url={fromData.petHeader?.url}
                time={dayjs(fromData.neuterTime).format("YYYY-MM-DD")}
                name={fromData.name}
                color={chooseColor}
              ></NFTCanvas>
            </Col>
          </Row>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FFA940",
                borderRadius: 21,
              },
            }}
          >
            <Row className="my-3.5">
              <Col span={3}>
                <span className="text-red-500">*</span>
                <span>{t("apply.sex")}: </span>
              </Col>
              <Col span={12}>
                <Radio.Group
                  options={[
                    { value: "female", label: t("apply.female") },
                    { value: "male", label: t("apply.male") },
                  ]}
                  value={fromData.gender}
                  onChange={(e) => {
                    setFromData((prevFromData: AddPetParams) => ({
                      ...prevFromData,
                      gender: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="my-3.5">
              <Col span={3}>
                <span className="text-red-500">*</span>
                <span>{t("apply.birthMonth")}: </span>
              </Col>
              <Col span={12}>
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="please choose"
                  format={{
                    format: "YYYY-MM",
                  }}
                  allowClear={false}
                  value={dayjs(fromData.birthMonth)}
                  onChange={(date) => {
                    setFromData((prevFromData: AddPetParams) => ({
                      ...prevFromData,
                      birthMonth: dayjs(date).format("YYYY-MM"),
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="my-3.5">
              <Col span={3}>
                <span className="text-red-500">*</span>
                <span>{t("apply.country")}: </span>
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
                    setFromData((prevFromData: AddPetParams) => ({
                      ...prevFromData,
                      country: e,
                    }));
                  }}
                />
              </Col>
            </Row>
            {fromData.country == "CN" && (
              <Row className="my-3.5">
                <Col span={3}>
                  <span className="text-red-500">*</span>
                  <span>{t("apply.sterilizationAddress")}: </span>
                </Col>
                <Col span={12}>
                  <Cascader
                    style={{ width: "100%" }}
                    options={addressOption}
                    value={fromData.address}
                    allowClear={false}
                    placeholder="please choose"
                    onChange={(e) => {
                      setFromData((prevFromData: AddPetParams) => ({
                        ...prevFromData,
                        address: e,
                      }));
                    }}
                  />
                </Col>
              </Row>
            )}
            <Row className="my-3.5">
              <Col span={3}>
                <span className="text-red-500">*</span>
                <span>{t("apply.condition")}: </span>
              </Col>
              <Col span={12}>
                <Radio.Group
                  options={[
                    { value: "1", label: t("apply.conditionValue1") },
                    { value: "2", label: t("apply.conditionValue2") },
                    { value: "3", label: t("apply.conditionValue3") },
                    { value: "4", label: t("apply.conditionValue4") },
                  ]}
                  value={fromData.status}
                  onChange={(e: any) => {
                    setFromData((prevFromData: AddPetParams) => ({
                      ...prevFromData,
                      status: e.target.value,
                    }));
                  }}
                />
              </Col>
            </Row>
            <Row className="my-3.5">
              <Col span={3}>
                <span>{t("apply.personality")}: </span>
              </Col>
              <Col span={12}>
                <Select
                  style={{ width: "100%" }}
                  value={fromData.character}
                  mode="tags"
                  placeholder="please select"
                  options={characterOptions}
                  onChange={(e: any) => {
                    setFromData((prevFromData: AddPetParams) => ({
                      ...prevFromData,
                      character: e,
                    }));
                  }}
                />
              </Col>
            </Row>
          </ConfigProvider>
          <Row className="my-3.5">
            <Col span={3}>
              <span>{t("apply.story")}: </span>
            </Col>
            <Col span={12}>
              <DescribeImg
                onDescriptionChange={handleDescriptionChange}
              ></DescribeImg>
            </Col>
          </Row>
          <Row>
            <Col span={3}></Col>
            <Col span={12} className="flex ">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#FFA940",
                    borderRadius: 21,
                  },
                }}
              >
                <Button
                  type="primary"
                  className={styles.applyButton}
                  onClick={handleSubmit}
                >
                  {t("apply.buttonName")}
                </Button>
                <Button type="primary" className={styles.applyButton}>
                  mint
                </Button>
              </ConfigProvider>
            </Col>
          </Row>
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
        <div className="absolute  z-10 top-56 right-10 w-96 ">
          <div className="relative">
            <img src="/img/cat@2x.png" className="absolute w-full" alt="" />
            <div className={styles.bigMiaoBubble}>
              {t("apply.guide")}
              <br />
              {t("apply.guide1")}
              <br />
              {t("apply.guide2")}miao
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyPage;
