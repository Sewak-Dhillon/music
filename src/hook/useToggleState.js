import React, { useState } from 'react'

export function useToggleState(initialValue){
  const [state,setState] = useState(initialValue)

  const toggle = () => {
    setState(prev => !prev)
    // console.log("useToggleHook")
  }

  return [state,toggle];
}

export default useToggleState