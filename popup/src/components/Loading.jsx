import React from 'react'
import Loader from "./../assets/loader.svg"
const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-dark flex flex-col items-center justify-center items-center z-20">
        <img src={Loader} alt="" className='w-20'/>
        <h4 className='text-primary text-xl'>REACTI.AI IS WAKING UP...</h4>
  </div>
  )
}

export default Loading