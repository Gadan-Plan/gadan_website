"use client";
import React, { useState, useEffect } from "react";
import { Switch, Row, Col, ConfigProvider } from "antd";
import Link from "next/link";
import { changeLanguage } from "@/utils/locales/I18n";
import { useTranslation } from "react-i18next";
import styles from "./ui/public.module.css";

const Header: React.FC = () => {
  const [isCh, setIsCh] = useState<boolean>(true); // 默认中文
  const { t } = useTranslation();

  useEffect(() => {
    if (isCh) {
      changeLanguage("zh-CN");
    } else {
      changeLanguage("en");
    }
  }, [isCh]);

  return (
    <div className={styles.header}>
      <Row style={{ height: "100%" }} className="items-center">
        <Col span={8} className="flex justify-center">
          <img className={styles.headerLogo} src="/img/icon_logo@2x.png" />
          <div className={styles.headerTitle}>{t("header.slogen")}</div>
        </Col>
        <Col span={10} className="flex justify-around ">
          <Link href="/home"> {t("link.home")}</Link>
          <Link href="/apply">{t("link.apply")}</Link>
          <Link href="/statistics">{t("link.statistics")}</Link>
          <Link href="/user">{t("link.user")}</Link>
          <Link href="/profile">{t("link.profile")}</Link>
        </Col>
        <Col span={2} className="flex justify-center">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FFA940",
              },
            }}
          >
            <Switch
              checked={isCh}
              onChange={setIsCh}
              checkedChildren="中"
              unCheckedChildren="en"
            />
          </ConfigProvider>
        </Col>
        <Col span={4} className="flex justify-center">
          <img className={styles.headerCat} src="/img/icon_cat@2x.png" />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
