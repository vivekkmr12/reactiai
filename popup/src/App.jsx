import { useEffect, useState } from "react"
import Header from "./components/Header";
import OpenBoarding from "./components/OpenBoarding";
import { HOST_URL, SERVER_URL } from "./config";
import googleIcon from "./assets/icons/google.svg"
import Loading from "./components/Loading";
import MainContent from "./components/MainContent";
function App() {
const [openBoarding,setOpenBoarding] = useState(false);
const [isLoading,setLoading] = useState(false);
const [userData,setUserData] = useState({count:0,limit:30,email:""});

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
    url:HOST_URL,
    name:"fb-session"
  })
  if(!fbSessionCookie || !fbSessionCookie.value){
    setLoading(false)
    return console.log("No cookie found",{fbSessionCookie})
  }
  const res = await fetch(SERVER_URL + "/checkauth",{headers:{"fb-session":fbSessionCookie?.value}})
  const response = await res.json();
  console.log({responseFromTokenCheck:response});
  if(response.success){
    setIsAuthenticated(true)
    setUserData(response.data)
  }
  setLoading(false)

  })()
},[])
const handleLogin = ()=>{
  chrome?.tabs?.create({active: true, url: HOST_URL+"/login"});
}

if(!isAuthenticated){

  return(
  <>
  {isLoading && <Loading />}
  <Header isAuthenticated={isAuthenticated}/>
  <div className="w-full min-h-[250px] flex justify-center items-center">
    <button className="px-4 py-3 rounded-lg bg-slate-800 flex items-center font-medium" onClick={handleLogin}><img className="w-8 mr-2" src={googleIcon} alt="" /><span> Sign in with google</span></button>
  </div>
  </>
  
   )
}
if(openBoarding){ 
  return(<OpenBoarding setOpenBoarding={setOpenBoarding}/>  )
}
  return (
    <>
    <Header isAuthenticated={isAuthenticated}/>
    <MainContent data={userData}/>
    </>
  )
}

export default App
