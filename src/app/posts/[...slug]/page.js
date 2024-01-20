import { make as PostView } from "@/views/posts/page/PostView.mjs";
import { Service } from "@/views/posts/domain/Post.mjs";

export default async function Page({ params }) {
  const postContent = await Service.getPostContentByTitle(
    params.slug[params.slug.length - 1]
  );
  return <PostView post={postContent} />;
}
