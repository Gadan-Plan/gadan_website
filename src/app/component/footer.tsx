"use client";
import React, { useState, useEffect } from "react";
import { Switch, Row, Col } from "antd";
import Link from "next/link";
// import i18n from '../i18n';

import styles from "./ui/public.module.css";

const Header: React.FC = () => {
  const [isCh, setIsCh] = useState<boolean>(true); // 默认中文

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
          <Link href="/home" className="my-1">首页</Link>
          <Link href="/apply" className="my-1">申请中心</Link>
          <Link href="/statistics" className="my-1">统计中心</Link>
          <Link href="/profile" className="my-1">个人中心</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
