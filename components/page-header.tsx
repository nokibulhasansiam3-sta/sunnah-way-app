'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useAppContext } from '@/context/app-context';
import type { Page } from '@/types';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backPage?: Page;
  actions?: ReactNode;
  className?: string;
}

export default function PageHeader({ title, subtitle, backPage, actions, className }: PageHeaderProps) {
  const { setCurrentPage } = useAppContext();

  return (
    <div className={cn("sticky top-0 z-40 -mx-4 mb-4 bg-background/80 px-2.5 py-3 backdrop-blur-lg", className)}>
      <div className="relative flex items-center justify-between gap-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
            {backPage && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 flex-shrink-0 rounded-full"
                  onClick={() => setCurrentPage(backPage)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
            )}
        </div>
        
        <div className='flex-grow text-center'>
          <h2 className="text-lg font-bold text-primary">{title}</h2>
          {subtitle && <p className="text-xs opacity-90 text-muted-foreground -mt-1">{subtitle}</p>}
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
