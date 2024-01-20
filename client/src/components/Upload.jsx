import React, { useState } from 'react';

function Upload() {
  const initialFormData = { detail: "" };
  const [formdata, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

       const data = await res.json();
       console.log(data)
      setLoading(false);
      setFormData(initialFormData);
      document.getElementById('detail').value = "";
    } catch (error) {
      setLoading(false);
    }
  };


  const handlechange = (e) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.id] : e.target.value,
      }));
    }

  return (
     <div className='w-screen h-screen flex flex-col justify-start items-center'>
        <form onSubmit={handleSubmit} className='mt-10 rounded-lg bg-white p-6 shadow shadow-slate-400 border-solid'>
          <h1 className='m-2 text-center font-semibold text-gray-600'>Add Todo</h1>
            <div className='flex flex-col rounded justify-center items-center'>
              <textarea className='p-4 overflow-hidden' id='detail'  onChange={handlechange} placeholder='add todo ...' cols={60} rows={10}>
              </textarea>
              <button className='bg-sky-500 my-2 hover:bg-sky-400 cursor-pointer w-full uppercase text-gray-300' disabled={loading} type='submit'>
                {!loading ? "add todo" : "uploading.."}
              </button>
          </div>
        </form>
      </div>
  );
}

export default Upload;
