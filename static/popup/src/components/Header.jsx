import logo from "./../assets/128.png"
const Header = ()=>{
        return <header className="w-full mb-5 px-[5%] py-2 flex justify-between border-b border-slate-800">
            <div className="flex items-end"><img src={logo} alt="" className="w-10 mr-1"/>
            <h1 className="text-3xl font-medium whitespace-nowrap text-slate-500">React AI</h1></div>
        </header>
}
export default Header;