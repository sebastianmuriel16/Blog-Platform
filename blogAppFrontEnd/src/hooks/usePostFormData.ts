import { useState, useEffect } from "react";
import type { Category, Tag } from "../types/post.type";
import { getCategories, getTags } from "../services/PostService";

export const usePostFormData = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const categories = await getCategories();
      const tags = await getTags();
      setCategories(categories);
      setTags(tags);
    };
    fetch();
  }, []);

  return { categories, tags };
};
