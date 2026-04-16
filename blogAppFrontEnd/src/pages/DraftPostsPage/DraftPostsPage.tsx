import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Post } from "../../types/post.type";
import { PostList } from "../../components/ListPosts/ListsPosts";
import { getDraftPosts } from "../../services/PostService";
export const DraftPostsPage = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getDraftPosts(token as string);
      setPosts(response);
    };
    fetchPosts();
  }, [token]);

  return (
    <div className="flex items-center justify-center mt-10">
      {posts.length === 0 ? (
        <div className="mt-10 flex min-h-[300px] w-full items-center justify-center">
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm font-medium text-gray-700">
              There are no posts yet.
            </p>
          </div>
        </div>
      ) : (
        <PostList posts={posts} className="w-full max-w-4xl space-y-4" />
      )}
    </div>
  );
};
