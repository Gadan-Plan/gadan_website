import { Inter } from "next/font/google";
import "./component/ui/globals.css";

import React from 'react';


import Header from './component/header';  
import Footer from './component/footer'; 
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <Header></Header>{children}<Footer></Footer></body>
    </html>
  );
}
