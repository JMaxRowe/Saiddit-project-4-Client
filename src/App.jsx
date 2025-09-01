import { useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router'


import Navbar from './components/Navbar/Navbar'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import Home from './components/Home/Home'

import ProfilePage from './components/ProfilePage/ProfilePage'
import PostPage from './components/PostPage/PostPage'

function App() {

  return (
    <>
      <Navbar/>
      <LeftSideBar/>
      <Routes>
        <Route index element={<Home/>}></Route>
        
      </Routes>
    </>
  )
}

export default App
