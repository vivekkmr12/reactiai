import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const MainContent = ({data}) => {
    const {count,limit,email} = data
  return (

    <div className="w-full min-h-[250px] flex justify-center items-center flex-col">
       <div className="flex justify-center gap-x-4 items-stretch">
       <img className='w-20 rounded-md mb-4' src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${email.replaceAll(".","")}`} alt="" />
        <div className='flex justify-center flex-col'>
        <h2 className='text-xl'>Welcome</h2>
        <h3 className='text-slate-400'>{email}</h3>
        </div>
       </div>
        <div className="my-6 mx-auto w-[30%] relative">
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center'>
            <h1 className='text-3xl text-[#54B64E] font-bold'>{limit}</h1>
            <h1 className='text-sm'>Total credits</h1>
          </div>
        <Doughnut data={ {
    labels: ['', ''],
    datasets: [
      {
        data: [count,limit-count],
        backgroundColor: [
          '#54B64E',
          '#FF0054',
        ],
        borderWidth: 0,
      },
    ],
   
  }}
  options={ {
    cutout: 60,
    plugins: {
      legend: {
        display: false
      }
    }
  }}/>
        </div>
        <div className="flex justify-between w-full max-w-[70%] mb-4">
      <button className=" p-2 rounded bg-[#54B64E] font-medium text-sm">{limit-count} credits left</button>
      <button className=" p-2 rounded bg-[#FF0054] font-medium text-sm">{count} credits used</button>

        </div>
      <a href="https://reacti.ai" target="blank" className=" px-4 py-3 rounded-lg bg-[#98292F] font-medium mb-4">Get more credits!</a>
      <div className="bg-[#252525] w-[95%] py-4 mx-auto mb-2 rounded-lg">
        <h1 className='px-4 pb-2 border-b border-slate-800'>Pro tip of the day!</h1>
        <h1 className='px-4 pt-2 text-slate-400'>Don't just post,Engage!</h1>
      </div>
    </div>
  )
}

export default MainContent