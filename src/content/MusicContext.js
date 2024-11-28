import { createContext, useContext } from "react";

const MusicContext = createContext()

export const MusicProvider = MusicContext.Provider

export const useMusic = ()=>{
    return useContext(MusicContext)
}

