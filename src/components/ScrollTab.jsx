import React from 'react'
import { useMusic } from '../content/MusicContext'

const ScrollTab = ({title, left,setLeft,data}) => {
    const {handleLeft,handleRight,inner} = useMusic()
    return (
        <div className='cursor-pointer text-white md:max-w-full'>
            <div className='w-full text-white flex justify-between'>
                <h2 className='font-bold text-xl'>{title}</h2>
                <div className='flex gap-2'>
                    <svg onClick={()=> handleLeft(setLeft,left)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${left >= 0 ? "cursor-not-allowed text-gray-500" : ""}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <svg onClick={() => handleRight(setLeft,left,data)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${left <= -(data.length * 136 - inner?.current?.offsetWidth) ? "cursor-not-allowed text-gray-500" : ""}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>    
  )
}

export default ScrollTab