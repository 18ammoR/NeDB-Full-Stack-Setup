const API_BASE = "/api";

async function apiRequest(endpoint, options = {}) {
  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Something went wrong");
  }

  return response.json();
}

export const getTasks = () => apiRequest("/tasks");

export const createTask = (title) =>
  apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });

export const updateTask = (id, updates) =>
  apiRequest(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

export const deleteTask = (id) =>
  apiRequest(`/tasks/${id}`, { method: "DELETE" });