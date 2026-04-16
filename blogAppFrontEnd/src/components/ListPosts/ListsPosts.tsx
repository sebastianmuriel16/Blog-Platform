// components/BlogPostList.tsx
import type { Post } from "../../types/post.type";
import { CardPost } from "../CardPost/CardPost";

interface BlogPostListProps {
  posts: Post[];
  className?: string;
}

export const PostList = ({ posts, className = "" }: BlogPostListProps) => (
  <div className={`space-y-2 ${className}`}>
    {posts.map((post) => (
      <CardPost key={post.id} post={post} />
    ))}
  </div>
);
