"use client";
import React, { useState, useEffect } from "react";
import  request  from "@/utils/request/request";
function RankPart() {
  const [locationData, setLocationData] = useState(null);



  return (
    <div className="App">
      <header className="App-header">
        <h1>百度地图API接口调试</h1>
        <pre>{locationData}</pre>
      </header>
    </div>
  );
}

export default RankPart;
