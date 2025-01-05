import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer>
      <div className="containe py-10 md:py-0 md:h-24">
        <p className="text-center text-sm md:text:left">
          Built by {''}
          <Link href={siteConfig.links.x} className="underline underline-offset-4 font-medium">
            KotaEnokida
          </Link>
          . Hosted on {''}
          <Link href={'https//vercel.com'}>Vercel</Link>
        </p>
      </div>
    </footer>
  );
}
