import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { techStackConfig } from '@/config/techstack';

// interface TechStackProps {
//   items: TechItem[];
// }

export default function IndexPage() {
  return (
    <>
      <section className="pt-6 md:pt-10 lg:py-32 pb-8 md:pb-12 lg:pb-16">
        <div className="container text-center flex flex-col items-center gap-4 max-w-[64rem]">
          <Link
            href={siteConfig.links.x}
            className="bg-muted px-4 py-2 rounded-md font-medium text-sm"
          >
            Xをフォローする
          </Link>
          <h1 className="text-4xl font-extrabold text-3xl sm:text-5xl md:text6xl lg:text-7xl">
            Post Writer
          </h1>
          <p className="text-muted-foreground sm:text-x1 leading-normal max-w-[42rem]">
            このアプリケーションはNext.js
            AppRouterで作られたもの。ユーザーはフォローしているユーザーの投稿を表示する
          </p>
          <div className="space-x-4">
            <Link href={'/login'} className={cn(buttonVariants({ size: 'lg' }))}>
              はじめる
            </Link>
            <Link
              href={siteConfig.links.github}
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
              target="_blank"
              rel="noreferrer"
            >
              Github
            </Link>
          </div>
        </div>
      </section>
      <section id="features" className="container py-8 md:py-12 lg:py-24 bg-slate-50 space-y-6">
        <div className="text-center space-y-6 max-w-[58rem] mx-auto">
          <h2 className="font-extrabold text-3xl md:text-6xl">サービスの特徴</h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            このプロジェクトはモダンな技術スタックを使って作られたWebアプリです。マークダウン形式でブログ投稿がd系マス
          </p>
        </div>
        <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {techStackConfig.techStack.map((item, index) => (
            <div key={index} className="bg-background border p-2 rounded-lg">
              <div className="flex flex-col justify-between p-6 md:h-[160px] h-[180px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 100 100.026"
                >
                  <path fill="#35495E" d={item.svgIcon} />
                </svg>
                <div className="space-y-2">
                  <h3 className="font-bold">{item.techName}</h3>
                  <p className="text-sm text-muted-foreground">
                    AppRouter/Layouts/APIRoutersの技術を使用
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto md:max-w-[58rem] text-center">
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            Post Writerはログインするとブログ投稿ができるようになります。
          </p>
        </div>
      </section>
      <section id="contact" className="container py-8 md:py-12 lg:py-24">
        <div className="max-w-[58rem] mx-auto text-center flex flex-col gap-4">
          <h2 className="font-extrabold sm:text-lg sm:leading-7">Contact Me</h2>
          <p>
            もしもWebサービスが気に入った場合は下記xからDMでご連絡ください。
            <br />
            お仕事のご連絡をお待ちしております。
          </p>
          <Link
            href={siteConfig.links.x}
            className="underline underline-offset-4"
            target="_blank"
            rel="noref"
          >
            お仕事はXまで
          </Link>
        </div>
      </section>
    </>
  );
}
