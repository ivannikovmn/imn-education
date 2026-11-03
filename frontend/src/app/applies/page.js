"use client"
import Header from '@/components/header'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { getEmployeeApplies } from '@/app/store/slices/applySlice'
import { useEffect } from 'react'
import MyApplies from '@/components/MyApplies'

export default function Applies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeApplies())
  }, [])

  return (
    <main>
        <Header />
        <div className='container'>
          <div className='flex flex-ai-c flex-js-sb ptb7'>
              <h1>Отклики и присутствие</h1>                          
          </div>      
          <MyApplies />               
        </div>
    </main>
  )
}