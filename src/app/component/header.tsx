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
    <div className={styles.header}>
      <Row style={{ height: "100%" }} className="items-center">
        <Col span={8} className="flex justify-center">
          <img className={styles.headerLogo} src="/icon_logo@2x.png" />
          <div className={styles.headerTitle}>Pawsitive Neuter</div>
        </Col>
        <Col span={10} className="flex justify-around ">
          <Link href="/home">首页</Link>
          <Link href="/apply">申请中心</Link>
          <Link href="/statistics">统计中心</Link>
          <Link href="/profile">个人中心</Link>
        </Col>
        <Col span={2} className="flex justify-center">
          <Switch
            checked={isCh}
            onChange={setIsCh}
            checkedChildren="中"
            unCheckedChildren="en"
          />
        </Col>
        <Col span={4} className="flex justify-center">
          <img className={styles.headerCat} src="/icon_cat@2x.png" />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
