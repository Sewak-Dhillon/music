import { useRef } from "react";
import createSlice from "@reduxjs/toolkit"
import { genrateRandomId } from "../utils/generateRandomId";

const initialState = {
   ref : useRef(null),
   favourite : [5,10,9],
   id : null,
   inner : useRef(null)
}


export const AppSlice = createSlice({
   name : "app",
   initialState,
   reducers : {
      playNext : (state,action) => {
         if(action.playload.mode === 1)
         {
            const newId = genrateRandomId(state.id)
            state.id = newId;
         }else{
            state.id = state.id + 1
         }
      },

      handleFavourite : (state) => {
         if(!state.favourite.includes(state.id))
         {
            favourite.push(state.id)
         }else{
            state.favourite = state.favourite.filter((item) => item.id !== state.id)
         }
      },

      onMusicChange : (state,action) => {
         if (state.id === action.playload.id) {
           if (ref.current) ref.current.currentTime = 0;
         } else state.id = action.playload.id;
       },

       handleLeft : (action) => {
         if(action.playload.left < 0)
           action.playload.setLeft(prev => prev+136)
       },
     
       handleRight : (action) => {
         if(action.playload.left > -(action.playload.data.length * 136 - state.inner.current.offsetWidth))
            action.playload.setLeft(prev => prev-136)
       }

   },
})

export const {handleFavourite,handleRight,handleLeft,onMusicChange,playNext} = AppSlice.actions


export default AppSlice.reducer