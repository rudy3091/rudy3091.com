import "./globals.scss";
import { Fira_Code } from "next/font/google";
import { make as AlignCenter } from "@/views/shared/AlignCenter.mjs";
import { make as NavigationBar } from "@/views/shared/NavigationBar.mjs";
import { make as AppFooter } from "@/views/shared/AppFooter.mjs";

const font = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "loves hacky stuff",
  description: "personal webpage, https://github.com/rudy3091",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavigationBar />
        <AlignCenter full>{children}</AlignCenter>
        <AppFooter />
      </body>
    </html>
  );
}
