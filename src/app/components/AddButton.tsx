import { useEffect, useState } from "react";
import { addbtn, addbtn2, addbtnsm, addbtnsm2 } from "../images/img";
import { Todo } from "../items/[itemId]/page";
type AddButtonProps = {
  todos: Todo[];
}
const AddButton = ({ todos }: AddButtonProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const addButton = incompleteTodos.length === 0 ? addbtn2 : addbtn;
  const addButtonSmall = incompleteTodos.length === 0 ? addbtnsm2 : addbtnsm;
  return <button type="submit">{isSmallScreen ? addButtonSmall : addButton}</button>;
};
export default AddButton;
