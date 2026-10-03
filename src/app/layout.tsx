import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { PhotoCredit } from "@/components/PhotoCredit";
import Mountains from "/public/images/mountain.jpg";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains_mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dylansmith.dev"),
  title: "Dylan Smith - Designer & Developer",
  description:
    "Dylan Smith is a UI Designer and Developer who crafts best in class storytelling experiences for the web.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HCTQRV20B1"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HCTQRV20B1');
  `}
        </Script>
      </head>

      <body
        className={`${inter.variable} ${jetbrains_mono.variable} relative bg-paper font-sans text-ink selection:bg-accent selection:text-accent-ink`}
      >
        <ThemeProvider>
          {/* Slate only: the mountain photo and its credit. Paper hides both. */}
          <Image
            src={Mountains}
            alt="mountains"
            placeholder="blur"
            quality={100}
            sizes="100vw"
            style={{
              objectFit: "cover",
              position: "fixed",
              width: "100%",
              height: "100%",
              zIndex: -30,
            }}
            className="ws-photo fixed"
          />
          <div className="ws-photo contents">
            <PhotoCredit />
          </div>

          <div id="layout">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
