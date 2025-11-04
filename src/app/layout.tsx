
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentModal from "@/components/ConsentModal";


export const metadata: Metadata = {
  title: "Asesor Anticonceptivo",
  description: "Comparador educativo de métodos hormonales y no hormonales.",
  applicationName: "Asesor Anticonceptivo",
  viewport: { width: "device-width", initialScale: 1 },
  icons: { icon: "/favicon.ico" },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-[--color-bg] text-[--color-fg]">
      <body className="min-h-screen flex flex-col font-sans">
        <ConsentModal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}