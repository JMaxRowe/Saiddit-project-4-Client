import { useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router'


import Navbar from './components/Navbar/Navbar'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'

import Home from './components/Home/Home'
import ProfilePage from './components/ProfilePage/ProfilePage'
import PostPage from './components/PostPage/PostPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'

function App() {

  return (
    <main className='appContainer'>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path='/sign-up' element={<SignUpPage />}></Route>
        <Route path='/sign-in' element={<SignInPage />}></Route>
        <Route path='/posts/:postId/' element={<PostPage />}></Route>
      </Routes>
    </main>
  )
}

export default App
