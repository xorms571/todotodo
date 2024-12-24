import { useRouter } from "next/navigation";
import { editbtn, editbtncomplete } from "../images/img";
import { Todo } from "../items/[itemId]/page";
interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  memo: string;
  name:string
  isCompleted: boolean;
  updateType: "isCompleted" | "memo";
}
const UpdateButton: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  memo,name,
  updateType,
  isCompleted,
}) => {
  const router = useRouter();
  const updateHandler = () => {
    let updatedData: Partial<Todo> = {};
    if (updateType === "isCompleted"){
      updatedData = { isCompleted: !todo.isCompleted };
      onUpdate(todo.id, { ...todo, ...updatedData });
    }
    else if (updateType === "memo") {
      updatedData = { memo, name };
      onUpdate(todo.id, { ...todo, ...updatedData });
      router.push("/");
    }
  };
  return (
    <button onClick={updateHandler} aria-label="Edit Todo">
      {isCompleted ? editbtncomplete : editbtn}
    </button>
  );
};
export default UpdateButton;
