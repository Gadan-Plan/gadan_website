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
import NFTCanvas from "./logoCreator";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import addressOption from "@/utils/address/cascader-address-options.js";
import dayjs from "dayjs";
import { mockBase64 } from "./mock";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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

const ApplyPage = () => {
  const [chooseColor, setChooseColor] = useState("#FFA940");
  const [loading, setLoading] = useState(false);
  const [fromData, setFromData] = useState<applicationForm>({
    gender: "male",
    neuterTime: dayjs(new Date()),
    status: "1",
    name: "咪咪",
    // headerImageUrl: undefined,
    quillContent: "这里可以写一写猫猫的日常",
  });
  const [fileList, setFileList] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);
  const characterOptions = [
    { value: "1", label: "性格1" },
    { value: "2", label: "性格2" },
    { value: "3", label: "性格3" },
    { value: "4", label: "性格4" },
  ];

  useEffect(() => {
    //   console.log(dayjs(new Date()).format('YYYY-MM-DD'));
  }, []);
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
        fromData.headerImageUrl = url;
      });
    }
    getBase64(info.file.originFileObj as FileType, (url) => {
      setLoading(false);
      fromData.headerImageUrl = url;
    });
  };
  const changeNeuterImgUrl: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        fromData.neuterImgUrl = url;
      });
    }
  };

  return (
    <>
      <div className="flex py-40 relative  justify-center">
        <div className={styles.applicationForm}>
          <div className="flex">
            <Image width={50} alt="" height={25} src="/icon_title01@2x.png" />
            <div className={styles.applicationFormTitle}>申请中心</div>
          </div>

          <div className={styles.applicationFormTitleEn}>
            <span>Application&nbsp;Center</span>
          </div>

          <Row>
            <Col span={10}>
              <Row className="my-2.5">
                <Col span={5}>
                  <span className="text-red-500">*</span>{" "}
                  <span>猫猫形象: </span>
                </Col>
                <Col span={9}>
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
                      {fromData.headerImageUrl ? (
                        <Image
                          src={fromData.headerImageUrl}
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
                <Col span={3}>
                  <span className="text-red-500">*</span> <span>色调: </span>
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
                <Row className="my-2.5">
                  <Col span={5}>
                    <span className="text-red-500">*</span>
                    <span>猫猫名字: </span>
                  </Col>
                  <Col span={14}>
                    <Input
                      placeholder="请输入猫猫的名字🐱"
                      value={fromData.name}
                    ></Input>
                  </Col>
                </Row>
                <Row className="my-2.5">
                  <Col span={5}>
                    <span className="text-red-500">*</span>
                    <span>噶蛋日: </span>
                  </Col>
                  <Col span={14}>
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="请选择"
                      format={{
                        format: "YYYY-MM-DD",
                      }}
                      value={fromData.neuterTime}
                    />
                  </Col>
                </Row>
              </ConfigProvider>
            </Col>
            <Col span={12}>
              <NFTCanvas
                base64Url={fromData.headerImageUrl}
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
            <Row className="my-2.5">
              <Col span={2}>
                <span className="text-red-500">*</span>
                <span>性别: </span>
              </Col>
              <Col span={6}>
                <Radio.Group
                  options={[
                    { value: "female", label: "母" },
                    { value: "male", label: "公" },
                  ]}
                  value={fromData.gender}
                  onChange={(e) => {
                    // 使用函数式的setState来更新状态
                    setFromData((prevFromData) => ({
                      ...prevFromData, // 保留之前的所有字段值
                      gender: e.target.value, // 只更新gender字段的值
                    }));
                    console.log("fromData.gender", fromData.gender);
                  }}
                />
              </Col>
            </Row>
            <Row className="my-2.5">
              <Col span={2}>
                <span className="text-red-500">*</span>
                <span>噶蛋地址: </span>
              </Col>
              <Col span={6}>
                <Cascader
                  options={addressOption}
                  value={fromData.address}
                  placeholder="请选择"
                />
              </Col>
            </Row>
            <Row className="my-2.5">
              <Col span={2}>
                <span className="text-red-500">*</span>
                <span>猫猫状态: </span>
              </Col>
              <Col span={6}>
                <Radio.Group
                  options={[
                    { value: "1", label: "已送养" },
                    { value: "2", label: "寻领养" },
                    { value: "3", label: "已放归" },
                  ]}
                  value={fromData.status}
                  onChange={(e: any) => {
                    // 使用函数式的setState来更新状态
                    setFromData((prevFromData) => ({
                      ...prevFromData, // 保留之前的所有字段值
                      status: e.target.status, // 只更新status字段的值
                    }));
                    console.log("fromData.status", fromData.status);
                  }}
                />
              </Col>
            </Row>
            <Row className="my-2.5">
              <Col span={2}>
                <span className="text-red-500">*</span>
                <span>猫猫性格: </span>
              </Col>
              <Col span={6}>
                <Select
                  style={{ width: "100%" }}
                  value={fromData.character}
                  mode="multiple"
                  placeholder="请选择"
                  //   onChange={handleChange}
                  options={characterOptions}
                />
              </Col>
            </Row>
            <Row className="my-2.5">
              <Col span={2}>
                <span className="text-red-500">*</span>
                <span>噶蛋纪念照: </span>
              </Col>
              <Col span={6}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="neuter-uploader"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={changeNeuterImgUrl}
                >
                  {fromData.neuterImgUrl ? (
                    <Image
                      src={fromData.neuterImgUrl}
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
                      <div style={{ marginTop: 8 }}>手术照片</div>
                    </button>
                  )}
                </Upload>
              </Col>
            </Row>
            <Row className="my-2.5 h-72">
              <Col span={2}>
                <span className="text-red-500 ">*</span>
                <span>猫猫故事: </span>
              </Col>
              <Col span={16}>
                <ReactQuill
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ color: [] }, { background: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ script: "sub" }, { script: "super" }],
                      ["clean"],
                      ["link", "image", "video"],
                    ],
                  }}
                  // value={fromData.quillContent}
                  // onChange={() => {}}
                  className="h-60"
                />
              </Col>
            </Row>
            <Row >
            <Col span={2}></Col>
              <Col span={12} className="flex ">
                <Button type="primary"  className={styles.applyButton}>
                  申请
                </Button>
                <Button type="primary" className={styles.applyButton}>
                  mint
                </Button>
              </Col>
            </Row>
          </ConfigProvider>
        </div>
        <Image
          src="/bg_bottom@2x.png"
          className="absolute  z-10 bottom-0 right-0  "
          alt=""
          width={3840}
          height={2802}
          layout="responsive"
        />
        <Image
          src="/bg_top_bottom@2x.png"
          className="absolute  z-10 bottom-0 left-0 "
          alt=""
          width={3840}
          height={394}
          layout="responsive"
        />
        <Image
          src="/bg_top_left@2x.png"
          className="absolute z-10 top-0 left-0 w-1/4"
          width={742}
          height={454}
          alt=""
          // layout="responsive"
        />
        <Image
          src="/bg_top_right@2x.png"
          className="absolute  z-10  top-0 right-0  w-1/4"
          alt=""
          width={730}
          height={536}
          // layout="responsive"
        />
        <div className="absolute  z-10 top-96 right-0 w-96 ">
          <div className="relative">
            <div className={styles.bigMiaoBubble}>
              请在这里填写小喵咪的申请资料哦！miao
            </div>
            <img src="/cat@2x.png" className="absolute w-full" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyPage;
