import { make as PostView } from "@/views/posts/page/PostView.mjs";
import { Service as PostService } from "@/views/posts/domain/Post.mjs";
import { Service as FmService } from "@/views/posts/domain/FrontMatter.mjs";

export async function generateMetadata({ params }) {
  const postContent = await PostService.getPostContentByTitle(
    params.slug[params.slug.length - 1]
  );
  const frontMatter = await FmService.fromContent(postContent);
  return {
    title: frontMatter.title,
  };
}

export default async function Page({ params }) {
  const postContent = await PostService.getPostContentByTitle(
    params.slug[params.slug.length - 1]
  );
  return <PostView postContent={postContent} />;
}
