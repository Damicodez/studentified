import type { Metadata } from "next";
import { Toaster } from 'sonner';
import { Providers } from "./providers";
import ScrollProgress from "../components/ScrollProgress"; // Import your new component
import "./globals.css";

export const metadata: Metadata = {
  title: "Studentified",
  description: "Real Wisdom, Real Growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,600&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      
      <body className="min-h-full flex flex-col transition-colors duration-300 bg-white dark:bg-[#121212]">
        <Providers>
          <ScrollProgress /> {/* Added here */}
          <Toaster richColors position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}