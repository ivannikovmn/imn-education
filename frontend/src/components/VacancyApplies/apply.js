'use client';
import { useDispatch } from 'react-redux'
import Link from 'next/link';
import { acceptApply, declineApply } from '@/app/store/slices/applySlice';
export default function Apply ({item}) {

    const dispatch = useDispatch()

    return (<div className="card card-block">

        <Link className='link' href={`/resumes/${item.resume.id}`}>{item.resume.first_name} {item.resume.last_name}</Link>        

        <div className='flex'>
            {item.status !=="ATTENDED" && <button className='button button-primary mr4' onClick={()=>dispatch(acceptApply(item.id))}>Одобрено</button>}
            {item.status !=="DECLINED" && <button className='button button-secondary' onClick={()=>dispatch(declineApply(item.id))}>Отказать</button>}
        </div>

    </div>)
}