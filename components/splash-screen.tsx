
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-holy">
      <Image src="https://i.postimg.cc/90YfNM5S/Deen-o-Darpon-app-logo.jpg" alt="SunnahWay Logo" width={100} height={100} className="mb-4 rounded-2xl drop-shadow-lg" />
      <h1 className="mb-2 text-4xl font-bold text-white">SunnahWay</h1>
      <p className="text-base text-white/80">সুন্নাহ ভিত্তিক ইসলামিক গাইড</p>
      <div className="mt-8 h-1 w-4/5 max-w-xs overflow-hidden rounded-full bg-white/30">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
