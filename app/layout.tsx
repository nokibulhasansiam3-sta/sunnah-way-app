
import type { Metadata, Viewport } from 'next';
import { Poppins, Inter, Tiro_Bangla, Tajawal, Noto_Nastaliq_Urdu, Noto_Naskh_Arabic, Hind_Siliguri, Noto_Sans_Bengali, Amiri } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/context/app-context';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

const tiroBangla = Tiro_Bangla({
  subsets: ['bengali'],
  weight: ['400'],
  variable: '--font-tiro-bangla',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-bengali',
});


const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-tajawal',
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-noto-nastaliq-urdu',
});

const uthmanicFont = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-uthmanic',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  title: 'SunnahWay - Your Islamic Guide',
  description: 'Your complete guide to an Islamic way of life based on the Sunnah. সুন্নাহ ভিত্তিক ইসলামিক গাইড।',
  manifest: '/manifest.json',
  icons: {
    apple: 'https://i.postimg.cc/90YfNM5S/Deen-o-Darpon-app-logo.jpg',
    icon: 'https://i.postimg.cc/90YfNM5S/Deen-o-Darpon-app-logo.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#2a9d8f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        "antialiased",
        poppins.variable,
        inter.variable,
        tiroBangla.variable,
        hindSiliguri.variable,
        notoSansBengali.variable,
        tajawal.variable,
        notoNastaliqUrdu.variable,
        uthmanicFont.variable,
        amiri.variable
      )}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
