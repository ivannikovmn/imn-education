import "./globals.css";
import ReduxProvider from "./store/provider";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "IMN Education",
  description: "Воркшопы, конспекты и материалы для самостоятельного обучения",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <GoogleAnalytics gaId="G-WQJTKN57HP" />
      </body>
    </html>
  );
}