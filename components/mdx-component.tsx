// 'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import Image from 'next/image';
import Callout from './Callout';

const components = {
  Image,
  Callout,
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose max-w-full prose-stone">
      <Component components={components} />
    </div>
  );
}
