import React from 'react'
import { Header } from '../../components/Header'
import { ToDo } from '../../components/ToDo/ToDo'

const Home = () => {
  return (
    <div className='bg-body'>
        <Header></Header>  
        <ToDo></ToDo> 
    </div>
  )
}

export default Home