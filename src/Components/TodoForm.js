import React,{useState}from 'react'

const TodoForm = ({addTodo}) => {
    const [value,setValue]=useState("")
    const handleChange=(e)=>{
        setValue(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        addTodo(value)
        setValue("")
    }
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input type='text' className='todo-input' placeholder='Add Task'value={value} onChange={handleChange}/>
        <button type='submit' className='todo-btn'>Add Task</button>
        </form>
  )
}

export default TodoForm