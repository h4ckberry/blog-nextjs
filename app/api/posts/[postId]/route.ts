import { Params } from './../../../../node_modules/next/dist/server/request/params.d';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { postPatchSchema } from '@/lib/validations/post';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

// export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
export async function PATCH(req: NextRequest) {
  try {
    // 非同期で params を解決
    // const resolvedParams = await context.params;
    // const { params } = routeContextSchema.parse({ resolvedParams });
    const postIdPath = req.nextUrl.pathname.split('/').pop()!;
    const { params } = routeContextSchema.parse({ params: { postId: postIdPath } });

    // リクエストボディの検証
    const json = await req.json();
    const body = postPatchSchema.parse(json);

    // バリデーション後に認証チェック
    // もし不正なJSONデータが送信された場合、認証チェックを実行する必要もないのに実行することになります
    // データベースへの不要なクエリを避けるべきです
    if (!(await isCurrentUserAuthorOfPost(params.postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    // 認証済みユーザーのみがここに到達
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }

  return NextResponse.json(null, { status: 200 });
}

// export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
export async function DELETE(req: NextRequest) {
  try {
    // const resolvedParams = await context.params;
    // const { params } = routeContextSchema.parse({ resolvedParams });

    // Get params from request
    const postIdPath = req.nextUrl.pathname.split('/').pop()!;
    const { params } = routeContextSchema.parse({ params: { postId: postIdPath } });

    if (!(await isCurrentUserAuthorOfPost(params.postId))) {
      return NextResponse.json(null, { status: 403 });
    }
    await db.post.delete({
      where: {
        id: params.postId,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }

  return new Response(null, { status: 204 });
}

// async function isCurrentUserAuthorOfPost({ params }: { params: Promise<{ postId: string }> }) {
async function isCurrentUserAuthorOfPost(postId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  });

  return count > 0;
}
