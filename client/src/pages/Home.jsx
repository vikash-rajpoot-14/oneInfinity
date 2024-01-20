import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import Upload from '../components/Upload';

function Home() {
  const { loading, error,currentUser } = useSelector((state) => state.user);
  // const navigate = useNavigate();
 

  // useEffect(()=>{
  //  async function fetchImages(){
  //     const images = await fetch("/api/image")
  //     const data = await images.json();
  //     // console.log(data)
  //     setImage(data.image)
  //  }
  //  fetchImages()
  // },[])

  return (
    <div className='bg-sky-200'>
      <Upload/>
    </div>
  )
}

export default Home
