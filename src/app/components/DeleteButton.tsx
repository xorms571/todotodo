import { useRouter } from "next/navigation";
import { deletebtn } from "../images/img";
interface TodoItemProps {
  todoId: string;
  onDelete: (id: string) => void;
}
const DeleteButton: React.FC<TodoItemProps> = ({ todoId, onDelete }) => {
  const router = useRouter();
  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete(todoId);
      router.push('/')
    }
  };
  return <button onClick={deleteHandler}>{deletebtn}</button>;
};
export default DeleteButton;