import React, { memo, useEffect,useState ,useCallback, useRef} from 'react'
import { useMusic } from '../content/MusicContext'
import {Card} from '../utils/Card'
import ScrollTab from './ScrollTab'

const Songdata =({title,data})=> {
    const {id,favourite,onMusicChange} = useMusic()
    const [left,setLeft] = useState(0);
    const {inner} = useMusic()

    const handleClick = (newId)=>{
        onMusicChange(newId)
    }
  

  return (
      <div className='cursor-pointer text-white sm:max-w-full mt-3'>
        <ScrollTab title = {title} setLeft={setLeft} left={left} data={data}/>
        <div className='overflow-hidden w-full h-[190px] relative'>
            <div ref={inner} className={`flex gap-4 w-full absolute left-0 scroll-smooth transition-all duration-500`} style={{left:left}}>
                {
                    Card.map((item) => {
                        const isHighlighted = id === item.id;
                        return (
                            data.includes(item.id) && <div
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                                className={`w-[120px] mt-2 ${
                                    isHighlighted ? "bg-gray-300" : "bg-gray-700"
                                } relative flex flex-col items-center min-w-[120px] rounded-xl hover:scale-105 transition-all duration-500`}
                            >
                                {
                                    favourite.includes(item.id) && <div className='absolute top-[-8px] right-[-5px] bg-white rounded-full p-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-red-500">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>
                                </div>
                                }
                                <img
                                    src={item.thumbnail}
                                    className="w-[70%] rounded-xl my-3 h-[50%]"
                                    alt=""
                                />
                                <span className={`font-bold ${
                                    isHighlighted ? "text-black" : ""
                                }`}>{item.song}</span>
                                <span className={`text-xs mb-2 ${
                                    isHighlighted ? "text-black" : ""
                                }`}>{item.artist}</span>
                            </div>
                        );
                    })

                }
            </div>
        </div>
    </div>
  )
}

export default Songdata;

