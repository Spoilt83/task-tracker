import React, { useState, useEffect } from 'react';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';

const API_URL = 'http://localhost:5000';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      showNotification('Failed to fetch tasks', 'error');
    }
  };

  const handleCreateTask = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        showNotification('Task created successfully');
        fetchTasks();
        setShowForm(false);
      }
    } catch (error) {
      showNotification('Failed to create task', 'error');
    }
  };

  const handleUpdateTask = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        showNotification('Task updated successfully');
        fetchTasks();
        setEditingTask(null);
        setShowForm(false);
      }
    } catch (error) {
      showNotification('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        showNotification('Task deleted successfully');
        fetchTasks();
      }
    } catch (error) {
      showNotification('Failed to delete task', 'error');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md ${
            notification.type === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Tracker</h1>
        <button
          onClick={() => setShowForm(true)}
          disabled={showForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Add New Task
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        </div>
      )}

      <TaskList
        tasks={tasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}