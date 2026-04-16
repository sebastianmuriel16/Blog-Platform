import { DataTable } from "../../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { createCategory, deleteCategory } from "../../services/PostService";
import { useAuth } from "../../hooks/useAuth";
import { CreateModal } from "../../components/CreateModal/CreateModal";

import type { Category } from "../../types/post.type";
import type { ErrorResponse } from "../../types/error.type";
import { getCategories } from "../../services/PostService";
export const CategoriesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
        setError(null);
      } catch (error) {
        setError(error as ErrorResponse);
      }
    };
    fetchCategories();
  }, [refresh]);

  const handleCreate = async (name: string | string[]) => {
    try {
      await createCategory(name as string, token as string);
      setShowModal(false);
      setRefresh(!refresh);
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id, token as string);
      setError(null);
      setRefresh(!refresh);
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  const handleClose = () => {
    setError(null);
    setShowModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {showModal && (
        <CreateModal
          title="New Category"
          onClose={handleClose}
          onSubmit={handleCreate}
          error={error}
        />
      )}
      {error && (
        <div className="px-4 py-2 rounded-lg bg-red-50 border border-red-200 mb-4">
          <span className="text-sm text-red-600">{error.message}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Categories</h1>
          {isAuthenticated && (
            <p className="text-xs text-gray-400 mt-1">
              Categories with posts cannot be deleted
            </p>
          )}
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setShowModal(true)}
            className="text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            + New category
          </button>
        )}
      </div>
      <div className="shadow-sm rounded-2xl">
        <DataTable
          items={categories}
          onDelete={handleDelete}
          showActions={isAuthenticated}
        />
      </div>
    </div>
  );
};
