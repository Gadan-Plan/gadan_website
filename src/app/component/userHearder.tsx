import React from "react";
import styles from "./ui/public.module.css";
import Image from "next/image";
const UserHeader: React.FC = () => {
  return (
    <div className={styles.userHeader}>
      <Image
        width={119}
        alt=""
        height={70}
        className="absolute bottom-1 left-24"
        src="/img/cat01@2x.png"
      />
      <Image
        width={119}
        alt=""
        height={70}
        className="absolute bottom-1 left-1/4"
        src="/img/cat02@2x.png"
      />
      <Image
        width={224}
        alt=""
        height={117}
        className="absolute bottom-1 right-24 "
        src="/img/cat03@2x.png"
      />
    </div>
  );
};

export default UserHeader;
