"use client";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Input } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import styles from "./ui/public.module.css";
import "./ui/antdChange.css";
import { useTranslation } from "react-i18next";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const { TextArea } = Input;
interface Props {
  onDescriptionChange: Function;
}
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const DescribeImg: React.FC<Props> = ({ onDescriptionChange }) => {
  const { t } = useTranslation();
  const [content, setContent] = useState<string | undefined>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    onDescriptionChange({
      content: content,
      fileList: fileList,
    });
  }, [content, fileList]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className={styles.describeImg}>
      <TextArea
        rows={4}
        placeholder={t("common.placeholder")}
        value={content}
        className={styles.describeTextarea}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />

      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        className="describeUpload"
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default DescribeImg;
