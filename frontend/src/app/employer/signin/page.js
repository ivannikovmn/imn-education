"use client"
import { useEffect, useState } from "react"
import { setError, signIn } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import logo from '../../images/logo.png'
import Link from 'next/link'

export default function EmployerSignin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const router = useRouter()

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error)
  useEffect(() => {
    return ()=> {
      dispatch(setError(null))
    }
  }, [dispatch])


  const handleSignup = () => {
    dispatch(signIn({
      email,
      password
    }, router))
  }

  return (
    <main className='bg'>
        <div className='container'>
            <div className='auth-header'>                
                <Link href="/">                            
                    <Image src={logo} alt="IMN Education" />                               
                </Link>                                     
                <p>
                    Зарегистрируйтесь сейчас, 
                    чтобы получить доступ к базе участников или
                    публикацию воркшопов - все
                    акции уже ждут вас в разделе
                    &quot;Помощь&quot;
                </p>
                <p>Ответим на вопросы</p>
                <a href='tel:77011223980'>+7 701 122 39 80</a>
            </div>

            <section className="login-page">            
            <div className="card">
                  <h1>Вход для поиска участников</h1>                  
                  <form>
                      <input className="input" placeholder="Введите email" value={email} onChange={(e)=>setEmail(e.target.value)}/>                      
                      <input type="password" className="input" placeholder="Введите пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>                      
                      <button className="button button-primary" onClick={handleSignup} type="button">Войти</button>
                  </form>
                  {error && Object.keys(error).map(key => (<p className="error" key="key"> { error[key] } </p>))}
              </div>
                          
            </section>

        </div>
    </main>
  )
}