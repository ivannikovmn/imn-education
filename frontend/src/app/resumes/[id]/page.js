'use client'
import Header from '@/components/header'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getResumeById } from '@/app/store/slices/resumeSlice'
import { useParams } from 'next/navigation'

export default function ResumePage() {  

  const dispatch = useDispatch();
  const {id} = useParams();
  const resume = useSelector(state => state.resume.resume)

  const didMount = () => {
    dispatch(getResumeById(id))
  }
  
  console.log("in page", resume);    

useEffect(didMount, [id])

  return (
    <main>
      <Header />
      <div className='container'>
        <div className='flex flex-ai-c flex-js-sb ptb7'>
            <Link className='link' href="/resumes">К списку резюме</Link>            
            <Link className='button button-secondary-bordered' href={`/edit-resume/${resume.id}`}>Редактировать</Link>
        </div>   
         <h1>{resume.first_name} {resume.last_name}</h1>   
      </div>
    </main>
  )
}