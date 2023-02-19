import { useEffect, useState } from "react"
import Header from "./components/Header";
import OpenBoarding from "./components/OpenBoarding";
function App() {
const [openBoarding,setOpenBoarding] = useState(false);
const [isLoading,setLoading] = useState(false);
const [count,setCount] = useState(0);
const [isAuthenticated,setIsAuthenticated] = useState(false);
useEffect(()=>{
  if(localStorage && !localStorage.getItem("onboardingShown")){
    setOpenBoarding(true);
  }
},[])
useEffect(()=>{
  (async ()=>{
    setLoading(true)
  const fbSessionCookie =await chrome?.cookies?.get({
    url:import.meta.env.VITE_HOST_URL,
    name:"fb-session"
  })
  if(!fbSessionCookie || !fbSessionCookie.value){
    setLoading(false)
    return console.log("No cookie found",{fbSessionCookie})
  }
  const res = await fetch(import.meta.env.VITE_SERVER_URL + "/checkauth",{headers:{"fb-session":fbSessionCookie?.value}})
  const response = await res.json();
  console.log({responseFromTokenCheck:response});
  if(response.success){
    setIsAuthenticated(true)
    setCount(response.count || 0)
  }
  setLoading(false)

  })()
},[])
const handleLogin = ()=>{
  chrome?.tabs?.create({active: true, url: import.meta.env.VITE_HOST_URL+"/login"});
}

if(!isAuthenticated){

  return(
  <>
  {isLoading && <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-20">
    <h2>Loading...</h2>
  </div>}
  <Header/>
  <div className="w-full min-h-[250px] flex justify-center items-center">
    <button className="px-4 py-3 rounded-lg bg-primary font-medium" onClick={handleLogin}>Login</button>
  </div>
  </>
  
   )
}
if(openBoarding){ 
  return(<OpenBoarding setOpenBoarding={setOpenBoarding}/>  )
}
  return (
    <>
    <Header/>
    <div className="w-full min-h-[250px] flex justify-center items-center flex-col">
      <button className="px-4 py-3 rounded-lg bg-primary font-medium mb-4">Logged In</button>
      <span className="text-lg text-slate-500">{`${count}/100 requests`}</span>
    </div>
    </>
  )
}

export default App
