import { useState } from "react";
import type { ErrorResponse } from "../../types/error.type";

interface CreateModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (data: string | string[]) => void;
  multiple?: boolean;
  error?: ErrorResponse | null;
}

export const CreateModal = ({
  title,
  onClose,
  onSubmit,
  multiple = false,
  error,
}: CreateModalProps) => {
  const [name, setName] = useState("");
  const [names, setNames] = useState<string[]>([]);

  const handleAdd = () => {
    if (!name.trim()) return;
    setNames((prev) => [...prev, name.trim()]);
    setName("");
  };

  const handleRemove = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleSubmit = () => {
    if (multiple) {
      if (names.length === 0) return;
      onSubmit(names);
    } else {
      if (!name.trim()) return;
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-900 mb-6">{title}</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={multiple ? handleKeyDown : undefined}
                placeholder={multiple ? "Add a name and press Enter" : "Name"}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {error && (
                <span className="text-xs text-red-500">{error.message}</span>
              )}
              {multiple && (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-100 transition-colors border border-indigo-200 shrink-0"
                >
                  Add
                </button>
              )}
            </div>
          </div>

          {multiple && names.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {names.map((n, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full border border-indigo-200"
                >
                  {n}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-indigo-400 hover:text-indigo-700 transition-colors ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium px-4 py-2 rounded-lg border border-slate-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
