import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

// components
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProductTest iAPP Technology",
  description: "Create Web Product Test To iAPP Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <Navbar />
          {children}
          <ToastContainer />
        </NextUIProvider>
      </body>
    </html>
  );
}
