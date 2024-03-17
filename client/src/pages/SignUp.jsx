import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
    {/*left side */}
      <div>
      <Link to="/" className='font-bold text-4xl dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white'>Sameer's</span>
      Blog
      </Link>
      <p className='text-sm mt-5'>
        This is a demo project. You can sign up with your email and password or with google.
      </p>
      </div>
      {/*right side*/}
      <div className=''>
         <form>
          <div>
            <Label value='Your username'  />
            <TextInput type='text' placeholder='Username' 
             id='username'  />
          </div>
         </form>
      </div>
    </div>
    </div>
  )
}

export default SignUp
