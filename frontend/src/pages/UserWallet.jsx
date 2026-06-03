import React from 'react'
import { Link } from 'react-router-dom'

const UserWallet = () => {
  return (
    <div className='min-h-screen bg-white'>
      <div className='flex items-center gap-4 px-5 py-4 border-b border-gray-100'>
        <Link
          to='/home'
          className='w-10 h-10 flex items-center justify-center rounded-full bg-[#eee] text-xl font-semibold'
        >
          ←
        </Link>
        <h1 className='text-xl font-semibold'>Uber Wallet</h1>
      </div>

      <div className='p-5'>
        <div className='bg-[#f0f0f0] rounded-2xl p-6 mb-6'>
          <p className='text-sm text-gray-600 mb-1'>Uber Cash</p>
          <p className='text-4xl font-bold mb-4'>₹0.00</p>
          <button
            type='button'
            className='bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold'
          >
            + Gift card
          </button>
        </div>

        <section className='mb-6'>
          <h2 className='text-lg font-semibold mb-3'>Payment methods</h2>
          <button
            type='button'
            className='w-full text-left py-4 border-b border-gray-100 font-medium text-gray-800'
          >
            + Add payment method
          </button>
          <div className='py-4 border-b border-gray-100 flex items-center gap-3'>
            <span className='text-2xl'>💳</span>
            <div>
              <p className='font-medium'>•••• 4242</p>
              <p className='text-sm text-gray-500'>Visa · Expires 12/28</p>
            </div>
          </div>
          <div className='py-4 flex items-center gap-3'>
            <span className='text-2xl'>📱</span>
            <div>
              <p className='font-medium'>UPI</p>
              <p className='text-sm text-gray-500'>Pay with any UPI app</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-3'>Vouchers</h2>
          <button
            type='button'
            className='w-full text-left py-4 text-gray-600 font-medium'
          >
            + Add voucher code
          </button>
        </section>
      </div>
    </div>
  )
}

export default UserWallet
