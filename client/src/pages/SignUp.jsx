import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const SignUp = () => {
  const [inputData,setInputData] = useState('');
  const [loading,setLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const changeHandler = (e) =>{
    setInputData({
      ...inputData,[e.target.id]:e.target.value
    })
  }
  const submitHandler = async(e)=>{
    e.preventDefault()
    if(!inputData.username || !inputData.email || !inputData.password){
      return setErrorMessage('Please fill out all fields.')
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const data = await axios.post('http://localhost:3000/api/auth/signup',inputData)
      console.log(data)
      if(data.success === false){
        return setErrorMessage(data.message)
      }
      setLoading(false)
        navigate('/signin')
      
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }

  }

  return (
    <div className='min-h-screen mt-20'>
    <div className='flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
    {/*left side */}
      <div className='flex-1'>
      <Link to="/" className='font-bold text-4xl dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white'>Sameer's</span>
      Blog
      </Link>
      <p className='text-sm mt-5'>
        This is a demo project. You can sign up with your email and password or with google.
      </p>
      </div>
      {/*right side*/}
      <div className='flex-1'>
         <form onSubmit={submitHandler} className='flex flex-col gap-5'>
          <div>
            <Label value='Your Username'  />
            <TextInput onChange={changeHandler}   type='username' placeholder='Enter Your Username' 
             id='username'  />
          </div>
          <div>
            <Label value='Your Email'  />
            <TextInput onChange={changeHandler} type='email' placeholder='Enter Your Email' 
             id='email'  />
          </div>
          <div>
            <Label value='Your Password'  />
            <TextInput onChange={changeHandler} type='password' placeholder='Enter Your Password' 
             id='password'  />
          </div>
           <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading} >
            {
              loading ? (
                <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading...</span>
                </>
              ):'Sign Up'
            }
           </Button>
         </form>
         <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account?</span>
          <Link to='/signin' className='text-blue-500'>
            Sign in
          </Link>
         </div>
         {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
         )}
      </div>
    </div>
    </div>
  )
}

export default SignUp
