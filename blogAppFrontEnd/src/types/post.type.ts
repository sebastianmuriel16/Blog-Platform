export interface Author {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  postCount: number;
}

export interface Tag {
  id: string;
  name: string;
  postCount: number;
}

export type PostStatus = "PUBLISHED" | "DRAFT";

export interface CreatePostRequest {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  status: PostStatus;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  category: Category;
  tags: Tag[];
  readingTime: number;
  createdAt: string;
  updatedAt?: string;
  status: PostStatus;
}
