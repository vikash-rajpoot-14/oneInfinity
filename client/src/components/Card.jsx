import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ todo, setTodos }) {
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("/api/todo", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setTodos(data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: 'DELETE',
      });
      await res.json();
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id!== id));
    } catch (error) {
      console.log(error);
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
