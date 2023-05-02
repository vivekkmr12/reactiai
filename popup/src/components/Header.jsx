import { HOST_URL } from "../config";
import logo from "./../assets/128.png";
import redirectIcon from "./../assets/redirect.svg";
const Header = ({isAuthenticated}) => {
  return (
    <header className="w-full mb-5 px-[5%] py-3 flex justify-between border-b border-slate-800 items-center">
      <div className="flex items-end">
        {/* <img src={logo} alt="" className="w-10 mr-1" /> */}
        <h1 className="text-2xl font-medium whitespace-nowrap ">
          REACTI.AI
        </h1>
      </div>
     {isAuthenticated && <a href={HOST_URL} target="_blank" className="bg-primary p-2  rounded text-base font-medium">
        Logout
        </a>}
    </header>
  );
};
export default Header;
