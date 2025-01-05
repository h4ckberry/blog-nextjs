import { Post } from '.prisma/client';
import Editor from '@/components/editor';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { User } from 'next-auth';
import { redirect, notFound } from 'next/navigation';

async function getPostForUser(postId: Post['id'], userId: User['id']) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return post;
}

export default async function EditorPage({ params }: { params: Promise<{ postId: string }> }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const post = await getPostForUser((await params).postId, user.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container">
      <Editor post={post} />
    </div>
  );
}
