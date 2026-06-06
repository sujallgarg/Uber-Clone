import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { getApiBaseUrl } from '../utils/api'

const UserSignup = () => {
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/home')
    }
  }, [token, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side validation
    if (firstname.trim().length < 3) {
      setError('Firstname must be at least 3 characters long')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      const newUser = { firstname, email, password }
      const response = await axios.post(
        `${getApiBaseUrl()}/users/register`,
        newUser
      )

      if (response.status === 201) {
        const { token, user } = response.data
        setUser(user)
        localStorage.setItem('token', token)
        setFirstname('')
        setEmail('')
        setPassword('')
        setError('')
        navigate('/home')
      }
    } catch (err) {
      console.error(err.response?.data || err.message)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.response?.data?.errors) {
        const errorMsgs = err.response.data.errors.map(e => e.msg).join(', ')
        setError(errorMsgs || 'Validation failed.')
      } else {
        setError(err.response?.data || err.message || 'Registration failed.')
      }
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
        <form className='w-90' name='signup-form' onSubmit={submitHandler}>
          {error && (
            <div className='bg-red-50 text-red-600 border border-red-200 rounded px-4 py-2.5 mb-5 text-sm font-medium w-full' role='alert'>
              {error}
            </div>
          )}

          <h3 className='text-xl mb-2'>Enter Name</h3>
          <input
            type='text'
            id='firstname'
            name='firstname'
            autoComplete='given-name'
            placeholder='John'
            className='bg-[#eeeeee] mb-1 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <p className='text-xs text-gray-500 mb-5'>Firstname must be at least 3 characters</p>

          <h3 className='text-xl mb-2'>Enter Email</h3>
          <input
            type='email'
            id='signup-email'
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
            id='signup-password'
            name='password'
            autoComplete='new-password'
            placeholder='Enter Your Password'
            className='bg-[#eeeeee] mb-1 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className='text-xs text-gray-500 mb-6'>Password must be at least 6 characters</p>

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          >
            Signup
          </button>

          <Link to='/login' className='mb-2 text-blue-600'>
            Already have an account? Login
          </Link>
        </form>

        <div className='flex justify-center items-center'>
          <button
            type='button'
            className='bg-[#111] text-white font-semibold mb-7 w-90 rounded px-4 py-2 border text-lg placeholder:text-base'
          >
            Sign up as Captain
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
