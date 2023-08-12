import { make as PostList } from "@/views/posts/page/PostList.mjs";
import { Service } from "@/views/posts/domain/Post.mjs";

export default function Posts() {
  const postTitles = Service.getAllPostTitles();
  return <PostList postTitles={postTitles} />;
}
