import { Inter, IBM_Plex_Mono, Indie_Flower } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "./components/Header";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: '400',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${indieFlower.variable}`}>
      <body>
        <Header />
        {children}
        <ContactForm />
        <Footer/>
      </body>
    </html>
  );
}
