import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

function Todo() {
  const [todos, setTodos] = useState([]);

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
      const response = await fetch(`/api/todo/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        console.error('Failed to delete todo:', response.status);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1 className='justify-center flex p-4 font-bold text-2xl'>All Todos</h1>
      <ul className='flex flex-wrap '>
        {todos?.map((todo) => (
          <li className='p-2 m-2' key={todo._id}>
            <Card todo={todo} setTodos={setTodos} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
