import type { Metadata } from "next";
import { Orbitron, Nunito } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-orbitron" });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Usama Khan — Web Developer",
  description: "Usama Khan is a web developer in Karachi, Pakistan, building thoughtful digital experiences with frontend, backend, and WordPress technologies.",
  openGraph: { title: "Usama Khan — Web Developer", description: "Thoughtful digital experiences, built with care.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${nunito.variable} ${orbitron.variable}`}><body>{children}</body></html>;
}
