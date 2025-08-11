'use client';

import {
  Star,
  PlusCircle,
  Compass,
  CalendarDays,
  Map,
  HelpCircle,
  Bookmark,
  PenSquare,
  Settings
} from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import { cn } from '@/lib/utils';
import type { Page } from '@/types';

export default function MenuPanel() {
  const { isMenuOpen, t, setCurrentPage, closeMenu } = useAppContext();

  const menuItems: { page: Page; label: string; icon: React.ElementType }[] = [
    { page: 'dua', label: t('dua_zikr'), icon: Star },
    { page: 'tasbih', label: t('tasbih'), icon: PlusCircle },
    { page: 'bookmarks', label: t('bookmarks' as any) || 'Bookmarks', icon: Bookmark },
    { page: 'qibla', label: t('qibla'), icon: Compass },
    { page: 'islamic-calendar', label: t('calendar'), icon: CalendarDays },
    { page: 'nearby-mosque', label: t('mosque'), icon: Map },
    { page: 'quiz', label: t('quiz'), icon: HelpCircle },
    { page: 'stories', label: t('stories'), icon: PenSquare },
    { page: 'settings', label: t('settings'), icon: Settings },
  ];
  
  const MenuItem = ({ page, label, icon: Icon }: (typeof menuItems)[0]) => {
  
    const handleClick = () => {
      setCurrentPage(page);
      closeMenu();
    };
  
    return (
      <div
        onClick={handleClick}
        className="flex cursor-pointer flex-col items-center gap-2 text-center transition-transform active:scale-95"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-7 w-7" />
        </div>
        <span className="text-xs font-medium text-foreground">{label}</span>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[90] mx-auto grid grid-cols-4 gap-x-4 gap-y-6 rounded-t-2xl border-t bg-background p-5 pb-8 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out',
        isMenuOpen ? 'translate-y-0' : 'translate-y-full'
      )}
      style={{
        paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
      }}
    >
      {menuItems.map(item => (
        <MenuItem key={item.page} {...item} />
      ))}
    </div>
  );
}
