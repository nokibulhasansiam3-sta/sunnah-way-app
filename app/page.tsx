
'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/app-context';
import type { Page } from '@/types';
import AppContainer from '@/components/app-container';
import Onboarding from '@/components/onboarding';
import SplashScreen from '@/components/splash-screen';
import LocationModal from '@/features/location/location-modal';

// Page Components
import HomePage from '@/features/home/home-page';
import QuranPage from '@/features/quran/quran-page';
import HadithPage from '@/features/hadith/hadith-page';
import DuaPage from '@/features/dua/dua-page';
import PrayerPage from '@/features/prayer/prayer-page';
import TasbihPage from '@/features/tasbih/tasbih-page';
import SettingsPage from '@/features/settings/settings-page';
import PlaceholderPage from '@/features/placeholder-page';
import QuranDetailPage from '@/features/quran/quran-detail-page';
import HadithBookPage from '@/features/hadith/hadith-book-page';
import HadithDetailPage from '@/features/hadith/hadith-detail-page';
import DuaCategoryPage from '@/features/dua/dua-category-page';
import DuaDetailPage from '@/features/dua/dua-detail-page';
import QuizPage from '@/features/quiz/quiz-page';
import QuizGamePage from '@/features/quiz/quiz-game-page';
import BookmarksPage from '@/features/bookmarks/bookmarks-page';
import StoriesPage from '@/features/stories/stories-page';
import StoryDetailPage from '@/features/stories/story-detail-page';
import QiblaPage from '@/features/qibla/qibla-page';
import CalendarPage from '@/features/calendar/calendar-page';


export default function Home() {
  const [appState, setAppState] = useState<'splash' | 'onboarding' | 'main'>('splash');
  const { currentPage, currentSurah, currentHadithBook, currentHadithChapter, setIsLocationModalOpen, t, locale, currentDuaCategory, currentDua, currentQuizCategory, currentStory, historyStack } = useAppContext();

  useEffect(() => {
    document.documentElement.lang = locale;
    if (locale === 'ar' || locale === 'ur') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [locale]);
  
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    setTimeout(() => {
      if (hasCompletedOnboarding) {
        setAppState('main');
        const hasLocation = localStorage.getItem('userLocation');
        if (!hasLocation) {
          setIsLocationModalOpen(true);
        }
      } else {
        setAppState('onboarding');
      }
    }, 2500); // Splash screen duration
  }, [setIsLocationModalOpen]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setAppState('main');
    setIsLocationModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'quran':
        return <QuranPage />;
      case 'quran-detail':
        return <QuranDetailPage surah={currentSurah} />;
      case 'hadith':
        return <HadithPage />;
       case 'hadith-book':
        return <HadithBookPage book={currentHadithBook} />;
       case 'hadith-detail':
        return <HadithDetailPage book={currentHadithBook} chapter={currentHadithChapter} />;
      case 'dua':
        return <DuaPage />;
      case 'dua-category':
        return <DuaCategoryPage category={currentDuaCategory} />;
      case 'dua-detail':
        return <DuaDetailPage dua={currentDua} />;
      case 'prayer':
        return <PrayerPage />;
      case 'stories':
        return <StoriesPage />;
      case 'story-detail':
        return <StoryDetailPage story={currentStory} />;
      case 'quiz':
         return <QuizPage />;
      case 'quiz-game':
          return <QuizGamePage category={currentQuizCategory} />;
      case 'tasbih':
        return <TasbihPage />;
      case 'bookmarks':
        return <BookmarksPage />;
      case 'qibla':
        return <QiblaPage />;
      case 'islamic-calendar':
        return <CalendarPage />;
      case 'nearby-mosque':
        return <PlaceholderPage icon="Map" title={t('nearby_mosque')} subtitle={t('coming_soon')} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  if (appState === 'splash') {
    return <SplashScreen />;
  }

  if (appState === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <>
      <AppContainer>{renderPage()}</AppContainer>
      <LocationModal />
    </>
  );
}
