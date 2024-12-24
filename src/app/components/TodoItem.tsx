import { useRouter } from "next/navigation";
import { Todo } from "../items/[itemId]/page";
import CheckBox from "./CheckBox";
interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Todo>) => void;
}
export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate }) => {
  const router = useRouter();
  return (
    <li
      className="border-black cursor-pointer border-2 rounded-3xl text-lg flex items-center gap-4 p-2"
      onClick={() => router.push(`/items/${todo.id}`)}
      style={{
        background: todo.isCompleted ? "#ede9fe" : "#fff",
      }}
    >
      <CheckBox onUpdate={onUpdate} todo={todo}/>
      <span
        className={`${todo.isCompleted?'line-through':''}`}
      >{todo.name}</span>
    </li>
  );
};
