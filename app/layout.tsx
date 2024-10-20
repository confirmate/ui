import { classNames } from "@/lib/util";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../node_modules/inter-ui/variable/InterVariable.woff2",
  variable: "--sans",
});

export const metadata: Metadata = {
  title: { default: "confirmate", template: "confirmate - %s" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={classNames(inter.className, "h-full")}>{children}</body>
    </html>
  );
}
