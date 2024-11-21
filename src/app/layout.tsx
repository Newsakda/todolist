import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI สำหรับอสังหาฯ โดยอาจารย์นิว",
  description: "AI ช่วยคิดคำพาดหัวขายบ้านเงินล้าน พัฒนาโดยอาจารย์นิว",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
