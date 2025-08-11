
'use client';

import { useState, useEffect } from 'react';
import { BookOpen, FileText, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { t } = useAppContext();
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const slides = [
    {
      icon: BookOpen,
      title: t('welcome_to_sunnahway'),
      description: t('islamic_guide_intro'),
    },
    {
      icon: FileText,
      title: t('hadith_books' as any) || "Quran & Hadith", // Fallback
      description: "সহজেই পবিত্র কুরআন ও সহীহ হাদিস পড়ুন, শুনুন এবং এর অর্থ জানুন।",
    },
    {
      icon: Timer,
      title: t('prayer_times' as any) || "Prayer Times & More",
      description: "সঠিক নামাজের সময়, কিবলা, তাসবিহ এবং ইসলামিক কুইজ সহ প্রয়োজনীয় সব ফিচার।",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="fixed inset-0 z-[99] flex flex-col items-center justify-between bg-background p-8 text-center">
        <div className="w-full">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {slides.map((slide, index) => {
                        return (
                            <CarouselItem key={index}>
                                <div className="pt-16">
                                    {index === 0 ? (
                                        <Image src="https://i.postimg.cc/90YfNM5S/Deen-o-Darpon-app-logo.jpg" alt="SunnahWay Logo" width={80} height={80} className="mx-auto mb-8 rounded-2xl" />
                                    ) : (
                                        <slide.icon className="mx-auto mb-8 h-20 w-20 animate-pulse-subtle text-primary" strokeWidth={1.5} />
                                    )}
                                    <h2 className="mb-4 text-2xl font-bold text-primary">
                                        {slide.title}
                                    </h2>
                                    <p className="mb-10 max-w-sm mx-auto text-muted-foreground">
                                        {slide.description}
                                    </p>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>
        </div>

        <div className="w-full max-w-xs space-y-6">
            <div className="flex justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                        "h-2 w-2 rounded-full bg-muted transition-all duration-300",
                        current === index + 1 ? "w-6 bg-primary" : "hover:bg-primary/50"
                    )}
                />
                ))}
            </div>
            <Button
                onClick={onComplete}
                className="w-full rounded-full bg-gradient-primary px-8 text-lg text-primary-foreground"
                size="lg"
            >
                {t('get_started')}
            </Button>
        </div>
    </div>
  );
}
