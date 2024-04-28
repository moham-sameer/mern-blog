import { Alert, Button, TextInput } from 'flowbite-react'
import React,{useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL,ref, getStorage, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
// import axios from 'axios'
import { updateFailure, updateStart,updateSuccess } from '../redux/user/userSlice'
const DashProfile = () => {
    const filePickerRef = useRef()
    const {currentUser} = useSelector(state=>state.user)
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError,setImageFileUploadError] = useState(null)
    const [formData,setFormData] = useState()
    const dispatch = useDispatch()
    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
        
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])
    const uploadImage = () =>{
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write:if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches("image/.*")
//     }
//   }
// }        
         setImageFileUploadError(null)
          const storage = getStorage(app);
          const fileName = new Date().getTime() + imageFile.name;
          const storageRef = ref(storage,fileName)
          const uploadTask = uploadBytesResumable(storageRef,imageFile)
          uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                 setImageFileUploadProgress(progress.toFixed(0))
            },
            (error)=>{
              setImageFileUploadError('Could not upload image (File must be less than 2MB)')
              setImageFileUploadProgress(null)
              setImageFile(null)
              setImageFileUrl(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileUrl(downloadURL)
                    setFormData({...formData,profilePicture:downloadURL})

            }
            )
            }
          )

    }
    const changeHandler = (e)=>{
        setFormData(
            {...formData,[e.target.id]:e.target.value}
        )
    }
    const submitHandler = async(e)=>{
        e.preventDefault()
        if(Object.keys(formData).length === 0){
            return;
        }
        try {
            console.log(currentUser.data._id)
           dispatch(updateStart()) 
           const res = await fetch(`http://localhost:3000/api/user/update/${currentUser.data._id || currentUser._id}`,{
             method:'PUT',
             headers:{'Content-Type':'application/json'},
             body:JSON.stringify(formData)
           },{
            withCredentials: true // Important: Include credentials (cookies) with the request
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
           const data = await res.json()
           if(!res.ok){
            dispatch(updateFailure(data.message))

           }else{
            dispatch(updateSuccess(data))
           }
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
       <h1 className='my-7 text-center font-semibold text-3xl '>Profile</h1>
       <form onSubmit={submitHandler} className='flex flex-col gap-4'>
       <input hidden ref={filePickerRef} type='file' accept='image/*' onChange={handleImageChange} />
       <div onClick={()=>filePickerRef.current.click()} className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full '>
       {imageFileUploadProgress && (
        <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5} styles={{
            root:{
                width:'100%',
                height:'100%',
                position:'absolute',
                top:0,
                left:0,
            },
            path:{
                stroke:`rgba(62,152,199,${imageFileUploadProgress /100})`
            }
        }}/>
       )}
        <img  className={`rounded-full object-cover w-full h-full border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} src={imageFileUrl || currentUser.profilePicture || currentUser.data.profilePicture} alt='user' />
       </div>
       
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError} </Alert>}
       
       <TextInput onChange={changeHandler} type='text' id='username' placeholder='username' defaultValue={currentUser.username || currentUser.data.username}/>
       <TextInput onChange={changeHandler} type='email' id='email' placeholder='email' defaultValue={currentUser.email || currentUser.data.email}/>
       <TextInput onChange={changeHandler} type='password' id='password' placeholder='password'/>
       <Button gradientDuoTone='purpleToBlue' outline type='submit'>Update</Button>
       </form>
       <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
       </div>
    </div>
  )
}

export default DashProfile
