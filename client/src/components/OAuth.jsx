import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async()=>{
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({prompt: 'select_account'})
      try {
        const resultsFromGoogle = await signInWithPopup(auth,provider)
        const res = await fetch('api/auth/google',resultsFromGoogle)
        

            dispatch(signInSuccess(res))
            navigate('/')
        


      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Button onClick={handleGoogleClick} type='button' outline gradientDuoTone='pinkToOrange'>
    <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
    Continue with Google
    </Button>
  )
}

export default OAuth
