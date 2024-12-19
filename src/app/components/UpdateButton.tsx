import { editbtn, editbtncomplete } from "../images/img";
import { Todo } from "../items/[itemId]/page";
interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  memo: string;
  isCompleted: boolean;
  updateType: "isCompleted" | "memo";
}
const UpdateButton: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  memo,
  updateType,
  isCompleted,
}) => {
  const updateHandler = () => {
    let updatedData: Partial<Todo> = {};
    if (updateType === "isCompleted")
      updatedData = { isCompleted: !todo.isCompleted };
    else if (updateType === "memo") updatedData = { memo };
    onUpdate(todo.id, { ...todo, ...updatedData });
  };
  return (
    <button onClick={updateHandler} aria-label="Edit Todo">
      {isCompleted ? editbtncomplete : editbtn}
    </button>
  );
};
export default UpdateButton;
