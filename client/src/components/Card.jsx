import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ todo, setTodos }) {
  const navigate = useNavigate();
  const [error ,setError] = useState(null)
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (res.ok) {
        const data = await res.text();
        const parsedData = data ? JSON.parse(data) : null;
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        console.error('Failed to delete todo:', res.status);
      }
    } catch (error) {
      setError(error.message)
      console.error('Error deleting todo:', error);
    }
  };
  

  const handleEdit = async (id) => {
    navigate(`/updatetodo/${id}`);
  };

  return (
    <div className='bg-sky-200 rounded-md m-auto w-72 p-4'>
    <div className='bg-transparent flex flex-col justify-end items-center'>
      <h4 className='h-32 p-2 overflow-auto text-start text-gray-800'>{todo.detail}</h4>
      <div className='flex gap-4 justify-center items-center'>
        <button onClick={() => handleEdit(todo._id)} className='bg-sky-500 hover:bg-sky-400 rounded-md px-3 py-2 '>
          Edit Todo
        </button>
        <button onClick={() => handleDelete(todo._id)} className='bg-red-500 hover:bg-red-400 rounded-md px-3 py-2 '>
          Delete Todo
        </button>
      </div>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
  </div>
  
  );
}

export default Card;
