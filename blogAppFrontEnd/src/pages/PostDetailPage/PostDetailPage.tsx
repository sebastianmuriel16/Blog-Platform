import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getPost, deletePost } from "../../services/PostService";
import type { Post } from "../../types/post.type";

export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const { isAuthenticated, userId, token } = useAuth();
  const isOwner = isAuthenticated && userId === post?.author.id;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPost(id as string);
      setPost(response);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("you want to delete this post?")) {
      await deletePost(id as string, token as string);
      navigate("/");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 ">
      <article className="bg-[#fafafa] border border-slate-200 rounded-2xl p-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            ← Back
          </button>

          {isOwner && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/posts/update/${id}`)}
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-100 hover:text-indigo-900"
              >
                Update
              </button>

              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-colors hover:border-red-300 hover:bg-red-100 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
          {post?.title}
        </h1>

        <div className="flex items-center gap-2 mb-8 pb-6 border-b border-slate-200">
          <span className="text-sm font-medium text-gray-700">
            {post?.author.name}
          </span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">
            {formatDate(post?.createdAt as string)}
          </span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{post?.readingTime} min</span>
        </div>

        <div className="text-gray-600 text-base leading-relaxed mb-10 prose max-w-none">
          {post?.content
            .split(". ")
            .filter((sentence) => sentence.trim())
            .map((sentence, index) => (
              <p key={`sentence-${index}`} className="mb-4">
                {sentence.trim()}.
              </p>
            ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-6 border-t border-slate-200">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
            {post?.category.name}
          </span>
          {post?.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};
