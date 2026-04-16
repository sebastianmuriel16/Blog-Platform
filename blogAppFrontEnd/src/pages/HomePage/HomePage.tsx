import { useState, useEffect } from "react";
import { PostList } from "../../components/ListPosts/ListsPosts";
import { getPosts } from "../../services/PostService";

import type { Post } from "../../types/post.type";
export const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      setPosts(response);
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex items-center justify-center mt-10">
      <PostList posts={posts} className="w-full max-w-4xl space-y-4" />
    </div>
  );
};
