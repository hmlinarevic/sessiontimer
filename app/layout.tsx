import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Session Timer",
    description: "Introduce sessions to your flow",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </Head>
            <body className={firaCode.className}>{children}</body>
        </html>
    );
}
