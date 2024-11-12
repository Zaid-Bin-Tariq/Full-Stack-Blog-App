import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="flex mb-0 h-12 w-full overflow-hidden py-4 bg-orange-100 border border-t border-t-black items-center">
            <div className='text-green-800 ml-4 md:ml-16 font-serif font-extrabold text-2xl'>Blog App</div>
            <div className='mx-auto mr-4 md:mr-16'>Created by Zaid bin Tariq</div>
        </section>
  )
}

export default Footer