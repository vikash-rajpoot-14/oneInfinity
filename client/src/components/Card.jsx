import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ todo, setTodos }) {
  const navigate = useNavigate();

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
      console.error('Error deleting todo:', error);
    }
  };
  

  const handleEdit = async (id) => {
    navigate(`/updatetodo/${id}`);
  };

  return (
    <div className='bg-cyan-100 w-80 gap-4'>
      <div className='bg-transparent  flex flex-col justify-end items-center '>
        <h4 className='h-32 p-4'>{todo.detail}</h4>
        <div className='flex gap-4 justify-center items-center p-2'>
          <button onClick={() => handleEdit(todo._id)} className='bg-sky-500 hover:bg-sky-400 rounded-md px-2 py-1 '>
            Edit Todo
          </button>
          <button onClick={() => handleDelete(todo._id)} className='bg-red-500 hover:bg-red-400 rounded-md px-2 py-1 '>
            Delete Todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
