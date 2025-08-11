'use client';

import { ReactNode } from 'react';
import { useAppContext } from '@/context/app-context';
import BottomNav from './bottom-nav';
import MenuPanel from './menu-panel';
import { Button } from './ui/button';
import { Moon, Settings, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const AppHeader = () => {
    const { isDarkMode, toggleDarkMode, t, setCurrentPage } = useAppContext();

    return (
      <header className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-[500px] bg-background/80 p-2.5 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex flex-1 items-center justify-center">
             <h1 className="text-xl font-bold text-primary">{t('home')}</h1>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => setCurrentPage('settings')}>
                <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    );
};

export default function AppContainer({ children }: { children: ReactNode }) {
  const { isMenuOpen, closeMenu, currentPage } = useAppContext();

  // The main header is now only shown on the home page.
  // Other pages will implement their own headers.
  const showHeader = currentPage === 'home';

  return (
    <div className="relative mx-auto min-h-screen max-w-[500px] overflow-hidden bg-background shadow-2xl">
      {showHeader && <AppHeader />}
      <main className={cn(
        "min-h-screen px-4 pb-24",
        // Add padding top only if the main header is shown.
        // Other pages will handle their own padding.
        showHeader && "pt-20"
      )}>
        {children}
      </main>
      <div 
        className={cn(
          "fixed inset-0 z-[80] bg-black/30 transition-opacity duration-300",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeMenu}
      />
      <MenuPanel />
      {!isMenuOpen && <BottomNav />}
    </div>
  );
}
