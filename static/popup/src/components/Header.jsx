import { HOST_URL } from "../config";
import logo from "./../assets/128.png";
import redirectIcon from "./../assets/redirect.svg";
const Header = () => {
  return (
    <header className="w-full mb-5 px-[5%] py-2 flex justify-between border-b border-slate-800 items-center">
      <div className="flex items-end">
        <img src={logo} alt="" className="w-10 mr-1" />
        <h1 className="text-3xl font-medium whitespace-nowrap text-slate-500">
          React AI
        </h1>
      </div>
      <a href={HOST_URL} target="_blank" className="text-blue-400 underline text-base font-medium">
        <span className="flex items-center">
        <img className="w-5 mr-1" src={redirectIcon} alt="" />
        Profile
        </span>
        </a>
    </header>
  );
};
export default Header;
