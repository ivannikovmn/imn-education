'use client'
import Header from '@/components/header'
import MyResumes from '@/components/myresumes'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getMyResumes } from '@/app/store/slices/resumeSlice';

export default function ResumePage() {  
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes)  
  const didMount = () => {
    dispatch(getMyResumes())
  }
    useEffect(didMount, [])
  return (
    <main>
      <Header />
      <div className='container'>
        <div className='flex flex-ai-c flex-js-sb ptb7'>
            <h1>Мои резюме</h1>            
        </div>   
        
        <MyResumes resumes={resumes}/>  
      </div>
    </main>
  )
}