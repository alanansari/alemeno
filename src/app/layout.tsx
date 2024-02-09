import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import NavMenu from "../components/NavMenu";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alemeno Task",
  description: "Courses Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(!session||!session.user){
    redirect('/api/auth/signin');
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NavMenu />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
