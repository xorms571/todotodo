import { emptydone, emptytodo, tododone, todoicon } from "../images/img";
import { Todo } from "../items/[itemId]/page";
import { TodoItem } from "./TodoItem";
interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Todo>) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  onUpdate,
}) => {
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
  return (
    <div className="todoListContainer flex gap-6">
      <ul className="flex flex-col gap-4 w-2/4">
        {todoicon}
        {incompleteTodos.length === 0
          ? emptytodo
          : incompleteTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
      </ul>
      <ul className="flex flex-col gap-4 w-2/4">
        {tododone}
        {completedTodos.length === 0
          ? emptydone
          : completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
      </ul>
    </div>
  );
};
