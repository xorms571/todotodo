import { logo1 } from "../images/img";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  return (
    <div className="w-full py-2.5 bg-white border-b-2">
      <div className="headerBox w-4/5 m-auto">
        <h1 className="cursor-pointer w-fit" onClick={() => router.push("/")}>{logo1}</h1>
      </div>
    </div>
  );
};

export default Header;
