import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/LoginForm/LoginForm'
import './App.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("token")) setUserLoggedIn(true)
  }, [])

  return (
    <>
      {userLoggedIn ? <h1>Hello</h1> : <LoginForm/> }
    </>
  )
}

export default App
