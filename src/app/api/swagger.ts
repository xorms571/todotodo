import { Todo } from "../items/[itemId]/page";

const url = "https://assignment-todolist-api.vercel.app/api";
const tenantId = "xorms6865";

export const fetchTodos = async (page: number = 1, pageSize: number = 10) => {
  const res = await fetch(
    `${url}/${tenantId}/items?page=${page}&pageSize=${pageSize}`
  );
  if (!res.ok) throw new Error("failed to fetch");
  return res.json();
};

export const fetchTodoDetail = async (itemId: string) => {
  const res = await fetch(`${url}/${tenantId}/items/${itemId}`);
  if (!res.ok) throw new Error("failed to fetch");
  return res.json()
};

export const addTodo = async (name: string) => {
  const res = await fetch(`${url}/${tenantId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("failed to add");
  const result = await res.json();
  return result;
};

export const deleteTodo = async (itemId: string) => {
  const res = await fetch(`${url}/${tenantId}/items/${itemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("failed to delete");
};

export const updateTodo = async (itemId:string, updatedData: Partial<Todo>) => {
  if (updatedData.imageUrl === null) updatedData.imageUrl = "";
  const res = await fetch(`${url}/${tenantId}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error("Error Details:", error);
    throw new Error("Failed to fetch");
  }
  return res.json();
};

export const uploadImage = async (imageFile: File): Promise<string> => {
  const apiUrl = `${url}/${tenantId}/images/upload`;
  const formData = new FormData();
  formData.append('image', imageFile);
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Image upload failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
