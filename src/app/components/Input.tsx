import { SetStateAction } from "react";
import { search } from "../images/img";

type InputProps = {
  setName: (value: SetStateAction<string>) => void;
  name: string;
};
const Input: React.FC<InputProps> = ({ setName, name }) => {
  return (
    <div className="relative w-full h-14">
      {search}
      <input
        className="absolute w-full h-full px-4 bg-transparent"
        type="text"
        placeholder="할 일을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default Input;
