import { useState } from "react";
import Input from "./Input";
import AddButton from "./AddButton";
import { Todo } from "../items/[itemId]/page";
type TodoFormProps = {
  todos: Todo[];
  onAdd: (title: string) => void;
}
export const TodoForm: React.FC<TodoFormProps> = ({ onAdd, todos }) => {
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName("");
  };
  return (
    <form className="flex mb-8 gap-4" onSubmit={handleSubmit}>
      <Input name={name} setName={setName} />
      <AddButton todos={todos} />
    </form>
  );
};
