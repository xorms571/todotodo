import { useEffect, useState } from "react";
import { logo1, logo2 } from "../images/img";
import { useRouter } from "next/navigation";
const Header = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="w-full py-2.5 bg-white border-b-2">
      <div className="headerBox w-4/5 m-auto">
        <h1 className="cursor-pointer w-fit" onClick={() => router.push("/")}>
          {isSmallScreen ? logo2 : logo1}
        </h1>
      </div>
    </div>
  );
};

export default Header;
