import type { ErrorResponse } from "../types/error.type";
import type {
  Post,
  Category,
  Tag,
  CreatePostRequest,
} from "../types/post.type";

const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json();
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);

  return handleResponse<Post[]>(response);
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);

  return handleResponse<Post>(response);
};

export const getDraftPosts = async (token: string): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts/drafts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<Post[]>(response);
};

export const createPost = async (
  post: CreatePostRequest,
  token: string,
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  return handleResponse<Post>(response);
};

export const updatePost = async (
  id: string,
  token: string,
  post: CreatePostRequest,
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  return handleResponse<Post>(response);
};

export const deletePost = async (id: string, token: string): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<Post>(response);
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/categories`);

  return handleResponse<Category[]>(response);
};

export const createCategory = async (
  name: string,
  token: string,
): Promise<Category> => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  return handleResponse<Category>(response);
};

export const deleteCategory = async (
  id: string,
  token: string,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<void>(response);
};

export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch(`${BASE_URL}/tags`);

  return handleResponse<Tag[]>(response);
};

export const createTag = async (
  names: string[],
  token: string,
): Promise<Tag> => {
  const response = await fetch(`${BASE_URL}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ names }),
  });

  return handleResponse<Tag>(response);
};

export const deleteTag = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tags/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse<void>(response);
};
