import { NewPostForm } from "../../components/PostForm/PostForm";
import { useState } from "react";
import { createPost } from "../../services/PostService";
import { useNavigate } from "react-router-dom";
import type { CreatePostRequest } from "../../types/post.type";
import type { ErrorResponse } from "../../types/error.type";
import { useAuth } from "../../hooks/useAuth";
import { usePostFormData } from "../../hooks/usePostFormData";

export const NewPostPage = () => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { categories, tags } = usePostFormData();

  const onSubmit = async (data: CreatePostRequest) => {
    try {
      await createPost(data, token as string);
      navigate("/");
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <NewPostForm
        title="New Post"
        onSubmit={onSubmit}
        categories={categories}
        tags={tags}
        error={error}
      />
    </div>
  );
};
