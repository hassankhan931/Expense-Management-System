import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Expense Tracker | Dashboard & API | Manage Transactions Easily",
  description:
    "The ultimate personal finance dashboard built with Next.js and Clerk. Securely track income, expenses, and manage financial data with a powerful, developer-friendly API.",
  keywords: [
    "expense tracker",
    "personal finance",
    "expense manager",
    "Next.js",
    "Clerk authentication",
    "API documentation",
  ],

  // ADDED GOOGLE SITE VERIFICATION META TAG HERE
  verification: {
    google: "hTrQmOjas8CZyH9CIjFLx8scoSkrvstiQcjX-XW7hTA",
  },
  openGraph: {
    title: "Expense Tracker | Dashboard & API",
    description:
      "Securely track income, expenses, and manage financial data with a powerful, developer-friendly API.",
    url: "https://expense-tracker-eosin-chi.vercel.app/",
    siteName: "Expense Tracker App",
    images: [
      {
        url: "https://expense-tracker-eosin-chi.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Expense Tracker Dashboard Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expense Tracker | Dashboard & API",
    description:
      "The ultimate personal finance dashboard built with Next.js and Clerk.",
    creator: "@YourTwitterHandle",
    images: ["https://expense-tracker-eosin-chi.vercel.app/og-image.jpg"],
  },
  metadataBase: new URL("https://expense-tracker-eosin-chi.vercel.app/"),
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Script
            id="chatbase-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="dnK0xCuOpWEur9Q3nh7HB";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
