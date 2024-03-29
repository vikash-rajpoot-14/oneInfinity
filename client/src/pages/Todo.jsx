import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Loader from '../components/Loader';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function fetchTodos() {
      try {
        const response = await fetch("https://oneinfinity.onrender.com/api/todo", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setTodos(data.todos);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError(error.message);
      }
    }
    fetchTodos();
  }, []);

  return (
    <div>
        {loading && <Loader/>}
      <h1 className='justify-center flex p-4 font-bold text-2xl'>All Todos</h1>
      <ul className='flex flex-wrap '>
        {todos?.map((todo) => (
          <li className='p-2 m-auto' key={todo._id}>
            <Card todo={todo} setTodos={setTodos} />
          </li>
        ))}
      </ul>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default Todo;
