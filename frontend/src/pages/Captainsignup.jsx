import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Captain login:', { email, password })
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
        <form className='w-90' name='captain-login-form' onSubmit={submitHandler}>
          <h3 className='text-xl mb-2 font-semibold'>Captain Login</h3>

          <h3 className='text-xl mb-2'>Enter Email</h3>
          <input
            type='email'
            id='captain-email'
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
            id='captain-password'
            name='password'
            autoComplete='current-password'
            placeholder='Enter Your Password'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          >
            Login as Captain
          </button>

          <Link to='/login' className='mb-2 text-blue-600'>
            Login as User
          </Link>
        </form>
      </div>
    </div>
  )
}

export default CaptainLogin
