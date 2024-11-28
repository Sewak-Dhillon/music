import React, {  memo,  useEffect, useRef, useState } from 'react'
import { useMusic } from '../content/MusicContext'
import  { Card } from '../utils/Card'
import { formatTime } from '../utils/formatTime'
import useToggleState from '../hook/useToggleState'

const MusicPlayer = () => {
  const progress = useRef(null)
  const [show,setShow] = useState(false)
  const [seeking,setSeeking] = useToggleState(false)
  const [mode,setMode] = useState(0)
  const [muted,setMuted] = useState(false)
  const [music,setMusic] = useState(null)
  const [currTime,setCurrTime] = useState(0)
  const [volume,setVolume] = useState(5)
  const [songTime, setSongTime] = useState(0);
  const {id,handleLeft,left,ref,playRandom,favourite,handleFavourite,handleRight,playNext,onMusicChange} = useMusic()
  const [progressValue,setProgressValue] = useState(0)
  
  const handleMode = ()=>{
    setMode((prev) =>{
      if(prev === 2)
        return 0;
      else
        return prev + 1;
    })
  }

  const handlePrev = (e) => {
    if(music === 0)
    {
      e.preventDefault()
    }else{
      setMusic((prev) => Math.max(prev - 1, 0))
      if(left < 0)
        handleLeft()
    }
  }
  
  const handleNext = (e) => {
    if(music === Card.length-1){
      e.preventDefault()
    }else{
      setMusic((prev) => Math.min(prev + 1, Card.length-1))
      if(left > -660)
        handleRight()
    }
  }
  
  const printTime = () =>{
    const time = parseInt(ref.current.currentTime)
    setCurrTime(time)
    const prog = (ref.current.currentTime / songTime) * 100;
    setProgressValue(prog)
  }

  const handleRangeChange = (e) => {
    const newValue = e.target.value;
    setProgressValue(newValue);

    if (ref.current) {
      const newTime = parseInt((newValue / 100) * songTime);
      ref.current.currentTime = newTime;
    }
  };

  useEffect(()=>{
    if(ref.current){
      if(muted)
      {
        ref.current.muted = muted;
        setVolume(0)
      }else{
        ref.current.muted = muted;
        setVolume(5)
      }
   }
  },[muted])

  useEffect(()=>{
    if(id !== null){
      setMusic(Card.findIndex((item) => item.id === id))
    }
  },[id])

  useEffect(()=>{
    if(music !== null){
      onMusicChange(Card[music].id)
      setProgressValue(0)
    }

  },[music])


  useEffect(()=>{ 
    if(ref.current)
    {
      ref.current.loop = mode === 2
    }
  },[mode])

  useEffect(()=>{
    if(ref.current){
      ref.current.volume = volume/10
    }
  },[volume])

  


  return (music !== null) ? (
    <>
    <audio className='hidden' ref={ref} 
        onLoadedMetadata={() => setSongTime(ref.current.duration)} 
        onTimeUpdate={()=> !seeking && printTime()} 
        onSeeking={() => setSeeking()}
        onSeeked={() => setSeeking()}
        onEnded={()=> playNext(mode)} 
        onPlaying={() => setShow(true)}
        onPause={()=>setShow(false)}
        src={Card[music].music}  
        autoPlay></audio>

    <div className='flex absolute bg-gray-600  bottom-0 w-full p-2 justify-around '>
      <div className='flex justify-between'>
        <div className='w-[50px] h-[50px] mr-2'>
          <img className='rounded-full w-full h-full' src={Card[music].thumbnail} alt=""/>
        </div>

        <div className='flex flex-col text-white w'>
          <span className='font-bold text-md w-full'>{Card[music].song}</span>
          <span className='text-sm w-full' >{Card[music].artist}</span>
        </div>
      </div>

      <div className='flex text-white justify-between items-center'>
        <div className='text-white mx-2 rounded-full' id='prev' onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${(music === 0 ? "text-gray-500 cursor-not-allowed" : "cursor-pointer")}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
          </svg>
        </div>

        <div className='text-white mx-2 rounded-full cursor-pointer'>
          {
            !show ? (
              <svg onClick= {() => ref.current.play()}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            ) : (
              <svg onClick= {() => ref.current.pause()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            )
          }
        </div>
        <div className='text-white mx-2 rounded-full cursor-pointer' id='next' onClick={mode === 1 ? playRandom : handleNext} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${(music === Card.length-1 ? "text-gray-500 cursor-not-allowed" : "cursor-pointer")}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
          </svg>
        </div>
      </div>

     <div className='w-[40%] flex flex-col justify-center'>
          <input ref={progress} onChange={handleRangeChange} type='range' min={0} max={100} value={progressValue} className='hidden sm:block w-full bg-green-500 h-3 cursor-pointer rounded-full'/>
        
        <div className="hidden sm:flex justify-between text-gray-400 text-sm">
          <span id="current-time">{formatTime(currTime)}</span>
          <span id="total-time">{formatTime(songTime)}</span>
        </div>
     </div>

      <div className='flex justify-between'>
        <div className='text-white items-center flex mx-2 rounded-full cursor-pointer' 
          onClick={handleFavourite}>
         {
          !favourite.includes(id) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg> :
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-500">
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        }
        </div>

       { mode === 0 &&
        <div className='text-white items-center flex mx-2 rounded-full cursor-pointer' onClick={handleMode}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
        </svg>

        </div>}

        {mode === 1 && <div className='text-white items-center flex mx-2 rounded-full cursor-pointer' onClick={handleMode}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>

        </div>}

        {mode === 2 &&
        <div className='text-white items-center flex mx-2 rounded-full cursor-pointer' onClick={handleMode}>
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
          </svg>
        </div>}


        <div className={`text-white items-center flex mx-2 rounded-full cursor-pointer`} >
        <input type="range" min={0} max={10} value={volume} onChange={(e) => setVolume(e.target.value)} className='hidden md:block mr-3'/>
          {
            !muted ? (
              <svg onClick={()=>{setMuted(prev => !prev)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            ):(
              <svg onClick={()=>{setMuted(prev => !prev)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            )
          }
        </div>
      </div>
    </div>
    </>
  ) : null
}

export default memo(MusicPlayer)