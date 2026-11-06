import "./globals.css";
import ReduxProvider from "./store/provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export const metadata = {
  title: "IMN Education",
  description: "Технологии, разработка, AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>

        <GoogleAnalytics gaId="G-WQJTKN57HP" />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2605703287322589"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}