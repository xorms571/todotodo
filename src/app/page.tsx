"use client";
import { useEffect, useState } from "react";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "./api/swagger";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { Todo } from "./items/[itemId]/page";
import Header from "./components/Header";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  /* useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  } */

  const fetchTodosHandler = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (title: string) => {
    await addTodo(title);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  const handleUpdate = async (id: string, data: Partial<Todo>) => {
    await updateTodo(id, data);
  };

  useEffect(() => {
    fetchTodosHandler();
  }, []);

  return (
    <div>
      <Header />
      <div
        className="bodyContainer m-auto my-8 w-4/5 h-full"
        style={{ background: "#f9fafb" }}
      >
        <TodoForm todos={todos} onAdd={handleAdd} />
        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}
