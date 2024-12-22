import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Created</th>
            <th className="p-4 text-left">Updated</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{task.title}</td>
              <td className="p-4">{task.description}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    task.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="p-4">{task.created_at}</td>
              <td className="p-4">{task.updated_at}</td>
              <td className="p-4 text-right">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 text-gray-600 hover:text-blue-600"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};