import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const UserLogout = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  useEffect(() => {
    const token = localStorage.getItem('token')

    const logout = async () => {
      try {
        if (token) {
          await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
        }
      } catch (err) {
        console.error(err.response?.data || err.message)
      } finally {
        localStorage.removeItem('token')
        setUser({ email: '', firstname: '' })
        navigate('/login')
      }
    }

    logout()
  }, [navigate, setUser])

  return (
    <div className='h-screen flex items-center justify-center'>
      <p className='text-lg'>Logging out...</p>
    </div>
  )
}

export default UserLogout
