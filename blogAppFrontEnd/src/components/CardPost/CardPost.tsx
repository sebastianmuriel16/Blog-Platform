// components/BlogPostCard.tsx
import { Link } from "react-router-dom";
import type { Post } from "../../types/post.type";

interface CardPostProps {
  post: Post;
  className?: string;
}

export const CardPost = ({ post, className }: CardPostProps) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const firstTags = post.tags.slice(0, 2);

  return (
    <article
      className={`bg-[#fafafa] border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-snug">
        {post.title}
      </h2>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-gray-700">
          {post.author.name}
        </span>
        <span className="text-xs text-gray-300">·</span>
        <span className="text-xs text-gray-400">
          {formatDate(post.createdAt)}
        </span>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
        {post.content.substring(0, 160)}...
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400">{post.readingTime} min</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-0.5 rounded-full">
            {post.category.name}
          </span>
          {firstTags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-0.5 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <Link
          to={`/posts/${post.id}`}
          className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors shrink-0"
        >
          Leer más →
        </Link>
      </div>
    </article>
  );
};
