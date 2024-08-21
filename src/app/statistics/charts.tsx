import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import chinaMapData from "@/utils/address/chinaMap.json";
import "./ui/echartsPart.css";
echarts.registerMap("china", chinaMapData);

export const EchartsPart = () => {
  const chinaData = [
    { name: "河北", num: 20 },
    { name: "海南", num: 10 },
    { name: "北京", num: 2 },
    { name: "浙江", num: 30 },
  ];
  const maxNum = chinaData.sort((a, b) => b.num - a.num)[0].num || 0;
  const getOption = (data) => {
    return {
      backgroundColor: "#fff", // 设置背景颜色
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "transparent",
        textStyle: {
          color: "#FE9146",
        },
        formatter: function (params) {
          // 检查数据值是否存在且不是NaN
          var value = params.value;
          if (isNaN(value)) {
            value = 0; // 将NaN替换为0
          }
          // 返回格式化的字符串
          return params.name + "<br/>数量: " + value;
        },
      },
      visualMap: {
        // 使用 visualMap 组件来根据数据值调整颜色
        min: 0,
        max: maxNum,
        left: "left",
        top: "top",
        // text: ["高", "低"], // 文本，默认为数值文本
        calculable: true,
        inRange: {
          color: ["#FEE198", "#FE9146"], // 颜色深浅变化
        },
      },
      series: [
        {
          name: "很符合大赛哈佛导师",
          type: "map",
          mapType: "china",
          zoom: 1.4,
          center: [113.665412, 34.757975], //河南
          data: data.map((item) => ({
            name: item.name,
            value: item.num,
          })),

          emphasis: {
            // 设置鼠标悬停时的样式
            itemStyle: {
              areaColor: null, // 鼠标悬停时的颜色为蓝色
            },
            label: {
              show: false,
            },
          },
        },
      ],
    };
  };
  // 生成排行列表的 HTML 内容
  const generateRankingList = (data) => {
    return data
      .sort((a, b) => b.num - a.num)
      .map((item, index) => (
        <div key={index} className="ranking-item">
          {index + 1}. {item.name} - {item.num}
        </div>
      ));
  };
  return (
    <div className="echarts-container">
      <ReactECharts
        option={getOption(chinaData)}
        style={{ height: 800, width: "100%" }} // 调整地图大小
      />{" "}
      <div className="ranking-list">
        <h3>排行列表</h3>
        {generateRankingList(chinaData)}
      </div>
    </div>
  );
};

export default EchartsPart;
