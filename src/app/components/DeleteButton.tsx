import { useRouter } from "next/navigation";
import { deletebtn } from "../images/img";
interface TodoItemProps {
  todoId: string;
  onDelete: (id: string) => void;
}
const DeleteButton: React.FC<TodoItemProps> = ({ todoId, onDelete }) => {
  const router = useRouter();
  const deleteHandler = () => {
    if (window.confirm("해당 일정을 삭제하시겠습니까?")) {
      onDelete(todoId);
      router.push('/')
    }
  };
  return <button onClick={deleteHandler}>{deletebtn}</button>;
};
export default DeleteButton;