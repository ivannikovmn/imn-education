"use client"
import { useEffect, useState } from "react"
import { signUp, setError } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import logo from '../../images/logo.svg'
import Link from 'next/link'


export default function EmployerSignup() {

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1)
  const [first_name, setName] = useState("")
  const [last_name, setSurname] = useState("")
  const [company_name, setCompanyName] = useState("")
  const [company_description, setCompanyDesc] = useState("")
  const [company_address, setCompanyAdr] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [company_logo, setCompanyLogo] = useState()
  const router = useRouter()
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error)
  useEffect(() => {
    return () => {
      dispatch(setError(null))
    }
  }, [dispatch])

  const onLogoChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  }

  const handleSignup = () => {
    dispatch(signUp({
      email,
      full_name: `${first_name} ${last_name}`,
      company_name,
      company_description,
      company_address,
      company_logo,
      password,
      password2
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
          {step === 1 && (
              <>
                  <div className="card">
                    <h1>Регистрация для поиска участников</h1>
                    <p>После регистрации вы сможете перейти в свой профиль</p>
                    <form>
                        <input className="input" placeholder="Введите email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <button className="button button-primary" onClick={()=>setStep(2)}>Продолжить</button>
                    </form>                
                    {error && Object.keys(error).map(key => (<p className="error" key={key}> { error[key] } </p>))}                      
                  </div>

                  <div className="auth-switch">
                      Если есть аккаунт, то{' '}
                      <Link href="/employer/signin">войти</Link>
                  </div>
              </>
          )}              

              {step === 2 && <div className="card">
                <h1>Как Вас зовут?</h1>
                <form>
                    <input className="input" placeholder="Имя" value={first_name} onChange={(e) => setName(e.target.value)}/>
                    <input className="input" placeholder="Фамилия" value={last_name} onChange={(e) => setSurname(e.target.value)}/>
                    <button className="button button-primary" onClick={()=>setStep(3)} type="button">Продолжить</button>
                    <button className="button button-primary-bordered" onClick={()=>setStep(1)}>Назад</button>
                </form>
                {error && Object.keys(error).map(key => (<p className="error" key={key}> { error[key] } </p>))}
              </div>}

              {step === 3 && <div className="card">
                {/* <h1>Введите название компании</h1> */}
                <h1>Введите название компании</h1>
                <form>
                    {/* <input className="input" placeholder="Название компании" value={company_name} onChange={(e) => setCompanyName(e.target.value)}/> */}
                    <input className="input" placeholder="Название компании" value={company_name} onChange={(e) => setCompanyName(e.target.value)}/>
                    <textarea className="textarea" placeholder="Описание" value={company_description} onChange={(e) => setCompanyDesc(e.target.value)}> </textarea>
                    <input className="input" placeholder="Адрес компании" value={company_address} onChange={(e) => setCompanyAdr(e.target.value)}/>                    
                    <input type="file" className="input" placeholder="Лого компании или проекта" onChange={onLogoChange}/>
                    <button className="button button-primary" onClick={()=>setStep(4)} type="button">Продолжить</button>
                    <button className="button button-primary-bordered" onClick={()=>setStep(2)}>Назад</button>
                </form>
                {error && Object.keys(error).map(key => (<p className="error" key={key}> { error[key] } </p>))}
              </div>}

              {step === 4 && <div className="card">
                <h1>Введите пароль</h1>
                <form>
                    <input type="password" className="input" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" className="input" placeholder="Повторите пароль" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                    <button className="button button-primary" onClick={handleSignup} type="button">Регистрировать</button>
                    <button className="button button-primary-bordered" onClick={()=>setStep(3)}>Назад</button>
                </form>
                {error && Object.keys(error).map(key => (<p className="error" key={key}> { error[key] } </p>))}
              </div>}
            </section>

        </div>
    </main>
  )
}
