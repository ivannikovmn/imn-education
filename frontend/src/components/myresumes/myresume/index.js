'use client';
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { deleteResume } from '@/app/store/slices/resumeSlice';
import { formatDate } from '@/app/utils/format'

export default function MyResume ({item}) {
    const dispatch = useDispatch()
    return (<div className="card mtb4">        
        <Link className="h3 link" href={`/resumes/${item.id}`}>{item.first_name} {item.last_name}</Link>
        <p>Создан {formatDate(item.createdAt)}</p>                 
        <span className='deleteResume' onClick={() => dispatch(deleteResume(item.id))}>Удалить</span> 
    </div>)
}