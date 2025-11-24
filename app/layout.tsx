import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { CurrentUserProvider } from "@/components/providers/current-user-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BuddyZone",
  description:
    "BuddyZone is a platform for finding friends and making new connections",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "BuddyZone",
    description:
      "BuddyZone is a platform for finding friends and making new connections",
    url: "https://buddyzone.vercel.app",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Toaster richColors position="bottom-right" />
        <QueryProvider>
          <CurrentUserProvider>{children}</CurrentUserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
