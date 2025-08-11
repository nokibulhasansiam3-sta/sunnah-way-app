

'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import type { Page, SurahWithAyats, HadithBook, HadithChapter, Locale, Theme, PrayerInfo, DuaCategory, Dua, QuizCategory, BookmarkItem, Ayat, Hadith, Font, BookmarkSurahInfo, Story, ArabicFont } from '@/types';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import bn from '@/locales/bn.json';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';
import ur from '@/locales/ur.json';

const translations = { bn, en, ar, ur };

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  currentSurah: SurahWithAyats | null;
  setCurrentSurah: (surah: SurahWithAyats | null) => void;
  currentHadithBook: HadithBook | null;
  setCurrentHadithBook: (book: HadithBook | null) => void;
  currentHadithChapter: HadithChapter | null;
  setCurrentHadithChapter: (chapter: HadithChapter | null) => void;
  currentDuaCategory: DuaCategory | null;
  setCurrentDuaCategory: (category: DuaCategory | null) => void;
  currentDua: Dua | null;
  setCurrentDua: (dua: Dua | null) => void;
  currentQuizCategory: QuizCategory | null;
  setCurrentQuizCategory: (category: QuizCategory | null) => void;
  currentStory: Story | null;
  setCurrentStory: (story: Story | null) => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  font: Font;
  setFont: (font: Font) => void;
  arabicFont: ArabicFont;
  setArabicFont: (font: ArabicFont) => void;
  location: string;
  setLocation: (location: string) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (isOpen: boolean) => void;
  prayerContext: ReturnType<typeof usePrayerTimes>;
  nextPrayer: PrayerInfo | null;
  currentPrayer: PrayerInfo | null;
  countdown: string;
  isProhibitedTime: boolean;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof (typeof bn)) => string;
  bookmarks: BookmarkItem[];
  addQuranBookmark: (surah: BookmarkSurahInfo, ayat: Ayat) => void;
  addHadithBookmark: (book: HadithBook, chapter: HadithChapter, hadith: Hadith) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [now, setNow] = useState(new Date());
  const [currentPage, _setCurrentPage] = useState<Page>('home');
  const [historyStack, setHistoryStack] = useState<Page[]>(['home']);

  const [currentSurah, setCurrentSurah] = useState<SurahWithAyats | null>(null);
  const [currentHadithBook, setCurrentHadithBook] = useState<HadithBook | null>(null);
  const [currentHadithChapter, setCurrentHadithChapter] = useState<HadithChapter | null>(null);
  const [currentDuaCategory, setCurrentDuaCategory] = useState<DuaCategory | null>(null);
  const [currentDua, setCurrentDua] = useState<Dua | null>(null);
  const [currentQuizCategory, setCurrentQuizCategory] = useState<QuizCategory | null>(null);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setThemeState] = useState<Theme>('default');
  const [font, setFontState] = useState<Font>('poppins');
  const [arabicFont, setArabicFontState] = useState<ArabicFont>('uthmanic');
  const [location, setLocationState] = useState('ঢাকা');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locale, setLocaleState] = useState<Locale>('bn');
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  
  const prayerContext = usePrayerTimes(location, now);

  const setCurrentPage = (page: Page) => {
    _setCurrentPage(page);
  };

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const applyTheme = (themeToApply: Theme) => {
    document.documentElement.classList.remove('theme-forest', 'theme-ocean', 'theme-rose', 'theme-twilight');
    if (themeToApply !== 'default') {
      document.documentElement.classList.add(`theme-${themeToApply}`);
    }
  }

  const applyFont = useCallback((fontToApply: Font) => {
    document.documentElement.classList.remove('font-poppins', 'font-inter', 'font-tiro-bangla', 'font-hind-siliguri', 'font-noto-sans-bengali');
    document.documentElement.classList.add(`font-${fontToApply}`);
  }, []);
  
  const applyArabicFont = useCallback((fontToApply: ArabicFont) => {
    document.documentElement.classList.remove('font-amiri', 'font-uthmanic');
    document.documentElement.classList.add(`font-${fontToApply}`);
  }, []);

  
  const applyLocaleSettings = (localeToApply: Locale) => {
    document.documentElement.lang = localeToApply;
    if (localeToApply === 'ar' || localeToApply === 'ur') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'default';
    setThemeState(savedTheme);
    applyTheme(savedTheme);
    
    const savedFont = localStorage.getItem('font') as Font || 'poppins';
    setFontState(savedFont);
    applyFont(savedFont);
    
    const savedArabicFont = localStorage.getItem('arabicFont') as ArabicFont || 'uthmanic';
    setArabicFontState(savedArabicFont);
    applyArabicFont(savedArabicFont);

    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);

    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setLocationState(savedLocation);
    } else {
      setIsLocationModalOpen(true);
    }
    
    const savedLocale = localStorage.getItem('locale') as Locale || 'bn';
    setLocale(savedLocale);

    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, [applyFont, applyArabicFont]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const setFont = (newFont: Font) => {
    setFontState(newFont);
    localStorage.setItem('font', newFont);
    applyFont(newFont);
  }

  const setArabicFont = (newFont: ArabicFont) => {
    setArabicFontState(newFont);
    localStorage.setItem('arabicFont', newFont);
    applyArabicFont(newFont);
  }
  
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    applyLocaleSettings(newLocale);
  };

  const t = useCallback((key: keyof (typeof bn)) => {
    return translations[locale]?.[key] || translations['bn'][key] || key;
  }, [locale]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', String(newMode));
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  const setLocation = (newLocation: string) => {
    localStorage.setItem('userLocation', newLocation);
    setLocationState(newLocation);
  };
  
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Bookmark functions
  const updateBookmarks = (newBookmarks: BookmarkItem[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  }

  const addQuranBookmark = (surah: BookmarkSurahInfo, ayat: Ayat) => {
    const newBookmark: QuranBookmark = {
      type: 'quran',
      id: `${surah.id}:${ayat.id}`,
      surah,
      ayat
    };
    updateBookmarks([newBookmark, ...bookmarks]);
  }

  const addHadithBookmark = (book: HadithBook, chapter: HadithChapter, hadith: Hadith) => {
    const newBookmark: HadithBookmark = {
      type: 'hadith',
      id: String(hadith.id),
      book,
      chapter,
      hadith,
    };
    updateBookmarks([newBookmark, ...bookmarks]);
  }

  const removeBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter(b => b.id !== id);
    updateBookmarks(newBookmarks);
  }
  
  const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);


  const value = {
    currentPage,
    setCurrentPage,
    historyStack,
    currentSurah,
    setCurrentSurah,
    currentHadithBook,
    setCurrentHadithBook,
    currentHadithChapter,
    setCurrentHadithChapter,
    currentDuaCategory,
    setCurrentDuaCategory,
    currentDua,
    setCurrentDua,
    currentQuizCategory,
    setCurrentQuizCategory,
    currentStory,
    setCurrentStory,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    isDarkMode,
    toggleDarkMode,
    theme,
    setTheme,
    font,
    setFont,
    arabicFont,
    setArabicFont,
    location,
    setLocation,
    isLocationModalOpen,
    setIsLocationModalOpen,
    prayerContext,
    nextPrayer: prayerContext.nextPrayer,
    currentPrayer: prayerContext.currentPrayer,
    countdown: prayerContext.countdown,
    isProhibitedTime: prayerContext.isProhibitedTime,
    locale,
    setLocale,
    t,
    bookmarks,
    addQuranBookmark,
    addHadithBookmark,
    removeBookmark,
    isBookmarked,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
