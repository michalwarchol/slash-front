import "@/scss/globals.scss";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { use } from "react";

import theme from "@/theme";

import { TParams } from "./types";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "S/ash",
  description: "Learning with a happy face",
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: TParams;
  }>
) {
  const params = use(props.params);

  return (
    <html lang={params.locale}>
      <body className={inter.className + " " + roboto.className}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>{props.children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
