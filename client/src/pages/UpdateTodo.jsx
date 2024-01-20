import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTodo() {
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState({ detail: "" });
  const [error, setError] = useState(null);
  const param = useParams();
  const navigate = useNavigate()
  const id = param.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ detail: todo.detail }),
      });

      const data = await res.json();
      console.log(data);

      setLoading(false);
      setTodo({ detail: "" }); 
      navigate("/todo")
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    async function fetchTodo() {
      try {
        const response = await fetch(`/api/todo/${id}`);
        const data = await response.json();
        console.log(data);
        setTodo(data.todo);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    }

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [id]: value,
    }));
  };

  return (
    <div className='w-screen h-screen flex flex-col justify-start items-center'>
      <form onSubmit={handleSubmit} className='mt-10 rounded-lg bg-white p-6 shadow shadow-slate-400 border-solid'>
        <h1 className='m-2 text-center font-semibold text-gray-600'>Update Todo</h1>
        <div className='flex flex-col rounded justify-center items-center'>
          <textarea
            className='p-4 overflow-hidden'
            id='detail'
            value={todo?.detail}
            onChange={handleChange} 
            placeholder='update todo ...'
            cols={60}
            rows={10}
          ></textarea>
          <button
            className='bg-sky-500 my-2 hover:bg-sky-400 cursor-pointer w-full uppercase text-gray-300'
            disabled={loading}
            type='submit'
          >
            {!loading ? 'Update Todo' : 'Uploading...'}
          </button>
        </div>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default UpdateTodo;
