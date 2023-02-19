import React from 'react'
import Header from './Header'
import warningIcon from "./../assets/warning.svg"
const OpenBoarding = ({setOpenBoarding}) => {
  const handleClick=()=>{
    localStorage.setItem("onboardingShown",true)
    setOpenBoarding(false)
  }
  return (
    <div>
        <Header/>
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center mb-8">
            <img src={warningIcon} className="w-6 mr-2" alt="" />
            <h1 className="text-2xl text-slate-500">React AI safety warning</h1>
          </div>
          <p className="text-lg text-slate-400 mb-6">ReactAI doesn't do any fact check and might have some biases. Please do any necessary check before sending any messages. We are not liable for any output from the AI.</p>
          <button className="bg-primary text-white font-semibold px-4 py-3 rounded-md" onClick={handleClick}>I Understand</button>
        </div>
    </div>
  )
}

export default OpenBoarding