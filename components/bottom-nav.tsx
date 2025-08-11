'use client';

import { BookOpen, FileText, Home, LayoutGrid } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const { toggleMenu, t, currentPage, setCurrentPage } = useAppContext();

  const navItems = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'quran', label: t('quran'), icon: BookOpen },
    { id: 'hadith', label: t('hadith'), icon: FileText },
  ];
  
  const NavItem = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => {
    const mainPage = currentPage.split('-')[0];
    const isActive = mainPage === id;
  
    return (
      <button
        onClick={() => setCurrentPage(id as any)}
        className={cn(
          'relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 text-muted-foreground transition-colors duration-300',
          isActive && 'text-primary'
        )}
      >
        <Icon className={cn('h-6 w-6 transition-transform duration-300', isActive && '-translate-y-1')} />
        <span className="text-xs">{label}</span>
        <div
          className={cn(
            'absolute -bottom-2.5 h-1 w-0 rounded-full bg-primary transition-all duration-300',
            isActive && 'w-6'
          )}
        />
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] mx-auto flex h-[70px] max-w-[500px] items-stretch border-t bg-background/95 pb-2 pt-1 backdrop-blur-lg">
      {navItems.map(item => (
        <NavItem key={item.id} {...item} />
      ))}
      <button
        onClick={toggleMenu}
        className="relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 text-muted-foreground"
      >
        <LayoutGrid className="h-6 w-6" />
        <span className="text-xs">{t('menu')}</span>
      </button>
    </nav>
  );
}
