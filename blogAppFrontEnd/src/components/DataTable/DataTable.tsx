import type { ErrorResponse } from "../../types/error.type";
interface TableItem {
  id: string;
  name: string;
  postCount: number;
}

interface DataTableProps {
  items: TableItem[];
  onDelete: (id: string) => void;
  showActions?: boolean;
}

export const DataTable = ({ items, onDelete, showActions }: DataTableProps) => {
  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete this?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-[#fafafa] border border-slate-200 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">
              Name
            </th>
            <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">
              Posts Count
            </th>
            <th className="text-right text-xs font-medium text-gray-500 px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center text-sm text-gray-400 px-6 py-8"
              >
                No items available
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr
                key={item.id}
                className={`transition-colors hover:bg-slate-50 ${
                  index !== items.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.postCount}
                </td>
                <td className="px-6 py-4 text-right">
                  {showActions ? (
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={item.postCount > 0}
                      className="text-xs font-medium px-3 py-1 rounded-lg transition-colors border
                                disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400
                                enabled:text-red-600 enabled:hover:text-red-800 enabled:border-red-200 enabled:hover:border-red-300 enabled:hover:bg-red-50"
                    >
                      Delete
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-gray-400">
                      ----
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
