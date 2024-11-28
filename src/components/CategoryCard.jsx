import React, { useEffect } from 'react'
import { useCallback, useState } from 'react'
import ScrollTab from './ScrollTab'

const CategoryCard = () => {
    const [active,setActive] = useState("All")
    const category = ["All","Relax","Party","Romance","Energetic","Relaxing","Jazz","Alternative","Romance","Energetic","Relaxing","Jazz","Alternative","Romance","Energetic","Relaxing","Jazz","Alternative"]
    const [catLeft,setCatLeft] = useState(0);

  return (
    <div className='w-full'>
        <ScrollTab title={"Select Category"} setLeft={setCatLeft} left = {catLeft} data={category}/>
        
        <div className='overflow-hidden w-full h-[50px] relative mt-3'>
            <div className={`flex gap-4 w-full absolute left-0 scroll-smooth transition-all duration-500`} style={{left:catLeft}}>
                {    category.map((item,index)=>(
                        <p key={index} onClick={()=> setActive(item)} className={`${active === item ? "bg-green-600" : "bg-black"} border hover:bg-green-600 w-[100px] flex justify-center shadow-md bg-black px-3 text-sm py-1 rounded-full text-white cursor-pointer`}>
                            {item}
                        </p>
                    ))
               }
            </div>
        </div>        
    </div>
  )
}

export default CategoryCard