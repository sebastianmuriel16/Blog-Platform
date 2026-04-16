import { useEffect, useState } from "react";

import { DataTable } from "../../components/DataTable/DataTable";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import { useAuth } from "../../hooks/useAuth";

import type { Tag } from "../../types/post.type";
import type { ErrorResponse } from "../../types/error.type";

import { getTags } from "../../services/PostService";
import { createTag, deleteTag } from "../../services/PostService";

export const TagPage = () => {
  const { isAuthenticated, token } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setTags(tags);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, [refresh]);

  const handleCreate = async (names: string[] | string) => {
    try {
      await createTag(names as string[], token as string);
      setShowModal(false);
      setRefresh(!refresh);
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTag(id, token as string);
      setError(null);
      setRefresh(!refresh);
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {showModal && (
        <CreateModal
          title="New Tag"
          onClose={() => {}}
          onSubmit={handleCreate}
          multiple
          error={null}
        />
      )}
      {error && (
        <div className="px-4 py-2 rounded-lg bg-red-50 border border-red-200 mb-4">
          <span className="text-sm text-red-600">{error.message}</span>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Tags</h1>
          {isAuthenticated && (
            <p className="text-xs text-gray-400 mt-1">
              Tags with posts cannot be deleted
            </p>
          )}
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setShowModal(true)}
            className="text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            + New Tag
          </button>
        )}
      </div>
      <div className="shadow-sm rounded-2xl">
        <DataTable
          items={tags}
          onDelete={handleDelete}
          showActions={isAuthenticated}
        />
      </div>
    </div>
  );
};
