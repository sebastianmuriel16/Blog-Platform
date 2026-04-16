import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { usePostFormData } from "../../hooks/usePostFormData";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../services/PostService";
import type { Post, CreatePostRequest } from "../../types/post.type";
import type { ErrorResponse } from "../../types/error.type";
import { updatePost } from "../../services/PostService";
import { NewPostForm } from "../../components/PostForm/PostForm";
export const UpdatePostPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { categories, tags } = usePostFormData();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const onSubmit = async (data: CreatePostRequest) => {
    try {
      await updatePost(id as string, token as string, data);
      if (post?.status === "DRAFT") navigate("/posts/drafts");
      else navigate("/");
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const post = await getPost(id as string);
      setPost(post);
    };
    fetchCategories();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <NewPostForm
        title="Update Post"
        onSubmit={onSubmit}
        categories={categories}
        tags={tags}
        post={post}
        error={error}
      />
    </div>
  );
};
