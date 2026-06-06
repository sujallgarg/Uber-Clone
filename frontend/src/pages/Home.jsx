import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/home')
    }
  }, [token, navigate])

  return (
    <div>
        <div className='h-screen bg-cover bg-[url(https://tb-static.uber.com/prod/udam-assets/d1588d37-b5d9-454a-8b99-2c3f30e50b52.svg)] bg-center flex justify-between flex-col w-full bg-red-400'>

            <img src="https://static.vecteezy.com/system/resources/previews/027/127/501/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" className='h-20 w-20'/>
            <div className='bg-white rounded p-3 m-2'>
                <h2 className='text-[30px] font-bold p-4'>Get Started with Uber</h2>
                <Link to='/login' className='flex text-white bg-black p-[8px] rounded w-[100%] items-center justify-center'>Continue</Link>
                {/* {localStorage.getItem('token') && (
                  <Link to='/user/logout' className='flex text-white bg-gray-700 p-[8px] rounded w-[100%] items-center justify-center mt-2'>
                    Logout  
                  </Link>
                )} */}
            </div>
        </div>
    </div>
  )
}

export default Home




