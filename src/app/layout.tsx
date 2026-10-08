// External
import type { Metadata } from "next";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

// Fonts
import { Inter, JetBrains_Mono } from "next/font/google";

// Internal
import "./globals.css";

// Components
import { Header } from "@/components/Header";
import Mountains from "/public/images/mountain.jpg";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { PhotoCredit } from "@/components/PhotoCredit";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains_mono",
});

export const metadata: Metadata = {
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
        {/* <GoogleAnalytics
          GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}
        /> */}
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
        className={`${inter.variable} ${jetbrains_mono.variable} relative font-sans selection:bg-teal-300 selection:text-teal-900 `}
      >
        {/* <div className="flex flex-col mx-auto min-h-screen h-screen px-4 overflow-y-auto"> */}
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
          className="fixed"
        />
        <PhotoCredit />
        {/* <div className="fixed -z-20 inset-0 h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div> */}
        <div
          id="layout"
          // className="relative mx-auto min-h-screen max-w-screen-2xl lg:flex lg:gap-12"
        >
          {/* <div className="absolute -z-20 inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div> */}

          {/* <Header activeSection={""} /> */}

          {children}
          {/* <main className="w-full px-6 pb-6 md:px-12 md:pb-14 lg:w-5/6 lg:pb-24">
          </main> */}
        </div>
      </body>
    </html>
  );
}

// {/* Photo Credit */}
// <div
//   id="touchpoint"
//   className="hidden md:block absolute group h-4 w-4 rounded-full right-12 md:right-12 bg-slate-100/60 outline outline-2 outline-offset-4 outline-slate-100/60 bottom-[40%] hover:bg-slate-100 transition-colors ease-out duration-500 hover:outline-slate-100"
// >
//   {/* This tooltip container exists so that the tooltip has a relative parent */}
//   <div
//     id="tooltipContainer"
//     className="relative flex"
//   >
//     {/* Tooltip body */}
//     <div className="absolute z-50 drop-shadow-lg flex flex-col min-w-[150px] p-2 -top-[64px] -right-2 text-sm font-mono rounded-lg bg-slate-100 text-slate-800 opacity-0 transition-opacity group-hover:opacity-100">
//       <span className="font-bold">Photo Cred</span>

//       <div className="flex items-center underline">
//         <a
//           href="https://www.pexels.com/photo/white-and-black-mountain-wallpaper-933054/"
//           target="_blank"
//         >
//           Joyston Judah
//         </a>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="w-4 h-4 ml-2"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
//           />
//         </svg>
//       </div>
//     </div>
//   </div>
// </div>
