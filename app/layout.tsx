import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabor & Mesa | Cardápio Digital",
  description: "Demonstração de um cardápio digital interativo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

