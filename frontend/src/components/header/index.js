'use client'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import logo from '../../app/images/logo.png'
import Link from 'next/link'
import { logOut } from '@/app/store/slices/authSlice'
import { useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export default function Header() {
    const dispatch = useDispatch()
    const router = useRouter()

    const mounted = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    )

    const isAuth = useSelector((state) => state.auth.isAuth)
    const currentUser = useSelector((state) => state.auth.currentUser)
    console.log(currentUser);
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div>
                        <Link href="/">
                            <Image src={logo} alt="imn-education" />
                        </Link>

                        {mounted && currentUser && currentUser.role && currentUser.role.name === "manager" && (
                            <Link href="/vacancy">Воркшопы</Link>
                        )}

                        {mounted && currentUser && currentUser.role && currentUser.role.name !== "manager" && (
                            <Link href="/resumes">Мои резюме</Link>
                        )}

                        {mounted && currentUser && currentUser.role && currentUser.role.name !== "manager" && (
                             <Link href="/applies">Отклики</Link>
                         )}

                        <a href='https://www.linkedin.com/in/-mikhail-ivannikov/'>Помощь</a>
                    </div>

                    <div>
                        {mounted && currentUser && currentUser.role && currentUser.role.name === "manager" && (
                            <Link className="header-button header-button--green" href="/create-vacancy">
                                Создать воркшоп
                            </Link>
                        )}

                        {mounted && currentUser && currentUser.role && currentUser.role.name !== "manager" && (
                            <Link className="header-button header-button--green" href="/create-resume">
                                Создать резюме
                            </Link>
                        )}
                        {mounted && !isAuth && (
                            <Link className="header-button" href="/login">
                                Войти
                            </Link>
                        )}

                        {mounted && isAuth && (
                            <a
                                className="header-button"
                                onClick={() => {
                                    const role = currentUser?.role?.name

                                    dispatch(logOut())

                                    if (role === "employee") {
                                        router.push("/login")
                                    } else {
                                        router.push("/employer/signin")
                                    }
                                }}
                            >
                                Выйти
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
