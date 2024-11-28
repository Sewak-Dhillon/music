import React, { useCallback, useMemo, useReducer,useState } from 'react'

const helper = (todos,action) =>{
    switch(action.type){
        case 'add':
            return [...todos,newTodo(action.payload.name)]
        case 'delete':
            return todos.filter((todo) => todo.id !== action.payload.id)
       
    }
}

const newTodo =(name) =>{
    return {id:Date.now(),name : name,completed:false}
}

const Reducer = () => {
    const [name,setName] = useState("")
    const [todos,dispatch] = useReducer(helper,[])
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch({type:'add',payload:{name:name}})
        setName("")
    }
    console.log(todos)
  return (
    <div>
        <form action=""
        onSubmit={handleSubmit}>
            <input className='py-3 px-2 m-4 bg-red-200' type="text" value = {name} onChange={(e)=> setName(e.target.value)} placeholder='Enter your name' />
            <button type='submit' className='py-3 px-2 bg-gray-400 text-white'>Submit</button>
        </form>
        <ul>
            {todos.map((item,index) =>(
                <div>
                    <li key={index}>{item.name}</li>
                    <button onClick={() => dispatch({type:'delete',payload:{id:item.id}})}>Delete</button>
                </div>
            ))}
        </ul>
    </div>


  )
}

export default Reducer