import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Urban",
  description: "An online portfolio for Kevin Urban",
};

const layoutStyle: React.CSSProperties = {
  paddingLeft: "3rem",
  paddingRight: "3rem",
  overflow: "visible",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} 
      ${geistMono.variable} antialiased`}
        style={layoutStyle}>
        {children}
      </body>
    </html>
  );
}
