import { useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router'


import Navbar from './components/Navbar/Navbar'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'

import Home from './components/Home/Home'
import ProfilePage from './components/ProfilePage/ProfilePage'
import PostPage from './components/PostPage/PostPage'
import SignUpPage from './components/SignUpPage/SignUpPage'

function App() {

  return (
    <>
      <Navbar/>
      <LeftSideBar/>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path='/sign-up' element={<SignUpPage />}></Route>
      </Routes>
    </>
  )
}

export default App
