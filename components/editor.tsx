'use client';

import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import TextareaAutosize from 'react-textarea-autosize';
import { useCallback, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { Post } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postPatchSchema, postPatchSchemaType } from '@/lib/validations/post';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { Icon } from './icon';

export default function Editor({
  post,
}: {
  post: Pick<Post, 'id' | 'title' | 'content' | 'published'>;
}) {
  const ref = useRef<EditorJS>(undefined);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'ここに記事を書く',
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
        },
      });
    }
  }, [post]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }

    return () => {
      ref.current?.destroy();
      ref.current = null!;
    };
  }, [isMounted, initializeEditor]);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<postPatchSchemaType>({
    resolver: zodResolver(postPatchSchema),
  });

  const onSubmit = async (data: postPatchSchemaType) => {
    setIsSaving(true);
    try {
      const blocks = await ref.current?.save();

      const payload = {
        title: data.title,
        content: blocks,
      };

      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setIsSaving(false);

      if (!response?.ok) {
        const error = await response.json();
        throw new Error('Failed to update post');
      }

      router.refresh();
      toast({
        description: '正常に保存されました。',
      });
    } catch (error) {
      toast({
        title: '問題が発生しました。',
        description: 'あなたの記事は保存されませんでした。もう一度お試しください。',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href={'/dashboard'} className={cn(buttonVariants({ variant: 'ghost' }))}>
              戻る
            </Link>
            <p className="text-sm text-muted-foreground">公開</p>
          </div>
          <button className={cn(buttonVariants())} type="submit">
            {isSaving && <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />}
            <span>保存</span>
          </button>
        </div>
        <div className="w-[800px] mx-auto">
          <TextareaAutosize
            id="title"
            autoFocus
            defaultValue={post.title}
            placeholder="Post Title"
            className="w-full resize-none overflow-hidden bg-transparent text-5xl focus:outline-none font-bold"
            {...register('title')}
          ></TextareaAutosize>
        </div>
        <div id="editor" className="min-h-[500px]" />
        <p className="text-sm text-gray-500">
          Use
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd>
          to open the command menu
        </p>
      </div>
    </form>
  );
}
