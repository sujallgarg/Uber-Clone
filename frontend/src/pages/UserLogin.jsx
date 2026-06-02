import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [UserData, setUserData] = useState({});

    const submitHandler = (e) =>{
        e.preventDefault()
        setUserData({
            email: email,
            password: password
        })
        console.log(UserData);
        setEmail('');
        setPassword('');
        
        
    }
  return (
    <div className='h-screen'>
        
     <Link to='/'>
      <img src="https://static.vecteezy.com/system/resources/previews/027/127/501/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" className='h-20 w-20' />
     </Link>  
    <div className='p-7 flex justify-center items-center flex-col'>

        <form className='w-90'name='login-form' onSubmit={(e)=>{
            submitHandler(e)
        }}>
            
        {/* <h3 className='text-xl mb-2'>What's  your email?</h3> */}
      
        <h3 className='text-xl mb-2'>Enter Email</h3>
<input
  type="email"
  id="email"
  name="email"
  autoComplete="email"
  placeholder="email@example.com"
  className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<h3 className='text-xl mb-2'>Enter Password</h3>
<input
  type="password"
  id="password"
  name="password"

  autoComplete="current-password"
  placeholder="Enter Your Password"
  className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

    
        <button type="submit" className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Login</button>
        <Link to='/signup' className='mb-2 text-blue-600'>Create new account</Link>
        </form>

    <div className='flex justify-center items-center'>
    <button type="button" className='bg-[#111] text-white font-semibold mb-7 w-90 rounded px-4 py-2 border text-lg placeholder:text-base'>Sign in as Captain</button>
    </div>
    </div>

    </div>
  )
}

export default UserLogin