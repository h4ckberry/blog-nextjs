import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MainNav from '../../components/main-nav';
import { marketingConfig } from '@/config/marketing';
import SiteFooter from '@/components/site-footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="container z-40 bg-background">
        <div className="h-20 p-6 flex items-center justify-between">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }), 'px-4')}
            >
              ログイン
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
