import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      )

      if (response.status === 200) {
        const { token, user } = response.data
        setUser(user)
        localStorage.setItem('token', token)
        navigate('/home')
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Login failed. Please try again.'
      setError(message)
    //   console.error(err.response?.data || err.message)
    }
  }

  return (
    <div className='h-screen'>
      <Link to='/'>
        <img
          src='https://static.vecteezy.com/system/resources/previews/027/127/501/non_2x/uber-logo-uber-icon-transparent-free-png.png'
          alt='Uber logo'
          className='h-20 w-20'
        />
      </Link>

      <div className='p-7 flex justify-center items-center flex-col'>
        <form className='w-90' name='login-form' onSubmit={submitHandler}>
          <h3 className='text-xl mb-2'>Enter Email</h3>
          <input
            type='email'
            id='email'
            name='email'
            autoComplete='email'
            placeholder='email@example.com'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h3 className='text-xl mb-2'>Enter Password</h3>
          <input
            type='password'
            id='password'
            name='password'
            autoComplete='current-password'
            placeholder='Enter Your Password'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className='text-red-600 mb-4 text-sm'>{error}</p>}

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          >
            Login
          </button>

          <Link to='/signup' className='mb-2 text-blue-600'>
            Create new account
          </Link>
        </form>

        <div className='flex justify-center items-center'>
          <Link
            to='/captainlogin'
            className='bg-[#111] text-white font-semibold mb-7 w-90 rounded px-4 py-2 border text-lg text-center'
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
