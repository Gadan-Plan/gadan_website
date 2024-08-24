"use client";
import React, { useState, useEffect } from "react";
import { Switch, Row, Col } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "./ui/public.module.css";

const Header: React.FC = () => {
  const [isCh, setIsCh] = useState<boolean>(true); // 默认中文
  const { t } = useTranslation();
  useEffect(() => {
    // if (isCh) {
    //   i18n.changeLanguage('zh-CN');
    // } else {
    //   i18n.changeLanguage('en');
    // }
  }, [isCh]);

  return (
    <div className={styles.footer}>
      <div className={styles.footerMain}>
        <h1 className={styles.footerTitle}>Pawsitive Neuter</h1>
        <div className="flex flex-col">
          <Link href="/home" className="my-1">
            {" "}
            {t("link.home")}
          </Link>
          <Link href="/apply" className="my-1">
            {t("link.apply")}
          </Link>
          <Link href="/statistics" className="my-1">
            {t("link.statistics")}
          </Link>
          <Link href="/user" className="my-1">
            {t("link.user")}
          </Link>
          <Link href="/personal" className="my-1">
            {t("link.personal")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
