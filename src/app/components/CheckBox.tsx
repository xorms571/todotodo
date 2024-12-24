import { checked, uncheck } from "../images/img";
import { Todo } from "../items/[itemId]/page";
type CheckBoxProps = {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
};
const CheckBox = ({ onUpdate, todo }: CheckBoxProps) => {
  const handleCheckboxChange = () => {
    onUpdate(todo.id, { isCompleted: !todo.isCompleted });
  };
  return (
    <div
      className="w-8 h-8 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleCheckboxChange();
      }}
    >
      {todo?.isCompleted ? checked : uncheck}
    </div>
  );
};

export default CheckBox;
