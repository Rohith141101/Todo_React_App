import React,{useEffect, useState} from 'react'
import TodoForm from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm'
uuidv4()
const getItemsromStorage=()=>{
    const task=localStorage.getItem("tasks")
    if(task){
        return JSON.parse(task)
    }
    else{
        return []
    }
}
const TodoWrapper = () => {
    const[todos,setTodos]=useState(getItemsromStorage())

    const addTodo=(todo)=>{
        setTodos([...todos, {id:uuidv4(), task:todo, completed:false, isEditing:false }])
    }
    const toggleComplete=(id)=>{
        setTodos(todos.map(todo=>todo.id===id?{
                ...todo,
                completed:!todo.completed
            }:todo
        ))
    }
    const deleteTodo=(id)=>{
        setTodos(todos.filter((todo)=>todo.id!==id))
        localStorage.removeItem(todos.filter((todo)=>todo.id!==id))
    }
    const editTodo=(id)=>{
        setTodos(todos.map((todo)=>todo.id===id?{
            ...todo,
            isEditing:!todo.isEditing}:todo
        ))
    }
    const editTask=(task,id)=>{
        setTodos(todos.map(todo=>todo.id===id?{...todo,task,isEditing:!todo.isEditing}:todo))}

    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(todos))
    },[todos])
  return (
    <div className='TodoWrapper'>
        <h1> Todo App</h1>
        <TodoForm addTodo={addTodo}/>
        {todos.map((todo,index)=>(
        todo.isEditing?(
            <EditTodoForm editTodo={editTask} task={todo}/>
        ):(
        <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>
        )))}
    </div>
  )
}

export default TodoWrapper
