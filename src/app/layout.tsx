import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-serif',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Lana Del Rey',
  description: 'A cinematic journey through the life, music, and mythology of Lana Del Rey.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#0A0A0A] text-[#F5F2EB] antialiased selection:bg-[#5A181D] selection:text-[#F5F2EB]">
        {children}
      </body>
    </html>
  );
}