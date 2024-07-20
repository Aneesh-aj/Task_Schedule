import { useState } from 'react'
import './App.css'
import Home from './page/Home'

import useGetUser from './hook/useGetUser'
import AuthRoutes from './routes/AuthRoutes'
import UserRoutes from './routes/UserRoutes'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'


function App() {

  const user = useGetUser()


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path="/auth/*" element={user && user.role =="user" ? <Navigate to="/"/> : (<AuthRoutes />)}  ></Route>
          <Route path="/admin/*" element={user.role !=="admin" ? <Navigate to="/"/> : (<AdminRoutes />)}  />
          <Route path="/user/*" element={user.role === "user" ? <UserRoutes/> : <Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
