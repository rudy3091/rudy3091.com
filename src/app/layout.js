import "./globals.scss";
import { Roboto_Mono } from "next/font/google";
import { make as AlignCenter } from "@/views/shared/AlignCenter.mjs";
import { make as NavigationBar } from "@/views/shared/NavigationBar.mjs";
import { make as AppFooter } from "@/views/shared/AppFooter.mjs";

const font = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "loves hacky stuff",
  description: "personal webpage, https://github.com/rudy3091",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <NavigationBar />
        <AlignCenter full>{children}</AlignCenter>
        <AppFooter />
      </body>
    </html>
  );
}
