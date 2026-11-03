'use client';

import Header from '@/components/header'
import Input from '@/components/input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { createResume } from '@/app/store/slices/resumeSlice';

export default function CreateResume() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [first_name, setName] = useState("")
  const [last_name, setSurname] = useState("") 
  console.log("rerender")

  const handleSave = () => {
    dispatch(createResume(    {
      first_name,
      last_name    
    }, router))

  }  

  return (
    <main>
      <Header />
      <div className='container p7'>
        <h1>Ваше резюме</h1>

        <h3>Контактные данные</h3>
        <Input placeholder="" type="text" label="Имя" size="fieldset-md" onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="" type="text" label="Фамилия" size="fieldset-md" onChange={(e) => setSurname(e.target.value)}/>                       
        <button className='button button-primary' onClick={handleSave}>Сохранить и опубликовать</button>
      </div>
    </main>
  )
}