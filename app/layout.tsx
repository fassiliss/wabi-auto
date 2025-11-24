import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "./components/Header";

// Template CSS

import "../styles/fontawesome.min.css";
import "../styles/magnific-popup.css";
import "../styles/slick.css";
import "../styles/meanmenu.css";
import "../styles/nice-select.css";
import "../styles/animate.css";
import "../styles/style.css";

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
    title: "Wabi Auto",
    description: "Car Service & Repair Website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            {/* Bootstrap CSS from CDN */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />

        {children}
        </body>
        </html>
    );
}

