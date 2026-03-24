import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ConditionalChatWidget } from "@/components/layout/ConditionalChatWidget";
import { PageTransition } from "@/components/layout/PageTransition";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineChat | AI-Powered Cinema Experience",
  description: "Khám phá thế giới phim ảnh thông minh với sự hỗ trợ từ Trí tuệ nhân tạo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <PageTransition>
            {children}
          </PageTransition>
          <ConditionalChatWidget />
        </Providers>
      </body>
    </html>
  );
}
