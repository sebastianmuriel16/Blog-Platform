import { useState } from "react";
import type {
  Tag,
  CreatePostRequest,
  Category,
  PostStatus,
  Post,
} from "../../types/post.type";

import type { ErrorResponse } from "../../types/error.type";

interface PostFormProps {
  title: string;
  post?: Post;
  categories: Category[];
  tags: Tag[];
  onSubmit: (data: CreatePostRequest) => void;
  error?: ErrorResponse | null;
}

export const NewPostForm = ({
  title,
  categories,
  tags,
  onSubmit,
  error,
  post,
}: PostFormProps) => {
  const [postFormData, setPostFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    categoryId: post?.category.id || "",
    tags: post?.tags || [],
    status: post?.status ?? "DRAFT",
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post?.tags.map((tag) => tag.id) || [],
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setPostFormData({
      ...postFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);

    // const data: CreatePostRequest = {
    //   title: formData.get("title") as string,
    //   content: formData.get("content") as string,
    //   categoryId: formData.get("categoryId") as string,
    //   tagIds: selectedTags as string[],
    //   status: formData.get("status") as PostStatus,
    // };

    // onSubmit(data);

    const data: CreatePostRequest = {
      title: postFormData.title,
      content: postFormData.content,
      categoryId: postFormData.categoryId,
      tagIds: selectedTags,
      status: postFormData.status as PostStatus,
    };

    onSubmit(data);
  };

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fafafa] border border-slate-200 rounded-2xl p-10"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={postFormData.title}
            onChange={handleChange}
            placeholder="Insert title..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {error && (
            <span className="text-xs text-red-500">{error?.errors?.title}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            value={postFormData.content}
            onChange={handleChange}
            placeholder="Insert content..."
            rows={8}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
          {error && (
            <span className="text-xs text-red-500">
              {error?.errors?.content}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            name="categoryId"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {error && (
            <span className="text-xs text-red-500">
              {error?.errors?.categoryId}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTags.includes(tag.id)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
          {error && (
            <span className="text-xs text-red-500">
              {error?.errors?.tagIds}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={postFormData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        {/* {error && (
          <div className="px-4 py-2 rounded-lg bg-red-50 border border-red-200">
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )} */}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
};
