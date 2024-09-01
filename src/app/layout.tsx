import type { Metadata } from "next";
import { Nunito, PT_Sans } from "next/font/google";
import "@/css/style.css";
import Header from "./_components/Header";
import type { ReactNode } from "react";
import ScrollToTopButton from "./_components/ScrollToTopButton";
import { getServerSession } from "next-auth";
import SeissionProvider from "./_components/SessionProvider";
import SessionProvider from "./_components/SessionProvider";

const nunitoStyle = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-nunito",
});
const ptSansStyle = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--pt-sans-font",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Next-Weiterbildung Projekt",
    default: "Home | Next-Weiterbildung Projekt",
  },
  description: "Next-Weiterbildung Projekt - Alex Sel",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html
      lang="de"
      className={`${nunitoStyle.variable} ${ptSansStyle.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <Header />
          <ScrollToTopButton />

          <div className="site-content">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
