import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.css"; 
import { useTranslation } from "react-i18next";
interface Props {
  base64Url: string|undefined;
  time: string;
  name: string;
  color: string;
}

const NFTCanvas: React.FC<Props> = ({ base64Url, time, name, color }) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);

  useEffect(() => {
    drawCanvas();
    console.log("change");
  }, [base64Url, time, name, color]); // 当props变化时，重新绘制canvas

  const drawCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除之前的绘制内容
    // 创建一个圆形路径并裁剪画布
    const logo = new window.Image();
    logo.src = "/img/icon_logo@2x.png";
    logo.onload = () => {
      // 绘制base64图片
      if (base64Url) {
        const base64Image = new window.Image();
        base64Image.src = base64Url;
        base64Image.onload = () => {
          ctx.drawImage(base64Image, 0, 0, canvas.width, canvas.height);
          ctx.drawImage(logo, 160, 160, 35, 36);
          // 绘制文字
          ctx.font = "16px MuyaoFont";
          ctx.fillStyle = color;
          ctx.fillText(name, 10, 170);
          ctx.font = "12px MuyaoFont";
          ctx.fillText(time, 10, 190);
          // 将canvas内容转换为图片
          setOutputImage(canvas.toDataURL("image/png"));
        };
      } else {
        // 如果没有base64Url，则只绘制logo和文字，然后生成图片
        setOutputImage(canvas.toDataURL("image/png"));
      }
    };
  };

  return (
    <div >
      <canvas
        ref={canvasRef}
        width={220}
        height={220}
        style={{ display: "none" }}
      />
      <div className={styles.showBox}>
        <div className={styles.showBoxWord}>{t("apply.nftGuide")}</div>
        {outputImage && (
          <img
            src={outputImage}
            alt="Combined Image"
            style={{ position: "relative", zIndex: 2 }}
          />
        )}
      </div>
    </div>
  );
};

export default NFTCanvas;
