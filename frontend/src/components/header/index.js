'use client'

import { useState, useSyncExternalStore } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import logo from '../../app/images/logo.svg'
import Link from 'next/link'
import { logOut } from '@/app/store/slices/authSlice'
import { useRouter } from 'next/navigation'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export default function Header() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)

    const mounted = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    )

    const isAuth = useSelector((state) => state.auth.isAuth)
    const currentUser = useSelector((state) => state.auth.currentUser)
    const role = currentUser?.role?.name

    const closeMenu = () => setMenuOpen(false)

    const handleLogOut = () => {
        closeMenu()
        dispatch(logOut())

        if (role === 'employee') {
            router.push('/login')
        } else {
            router.push('/employer/signin')
        }
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <Link className="header-logo" href="/" onClick={closeMenu}>
                        <Image src={logo} alt="IMN Education" />
                    </Link>

                    <button
                        className={`header-burger${menuOpen ? ' is-open' : ''}`}
                        type="button"
                        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <div className={`header-menu${menuOpen ? ' is-open' : ''}`}>
                        <nav className="header-nav">
                            {mounted && role === 'manager' && (
                                <Link href="/vacancy" onClick={closeMenu}>
                                    Воркшопы
                                </Link>
                            )}

                            {mounted && role && role !== 'manager' && (
                                <Link href="/resumes" onClick={closeMenu}>
                                    Резюме
                                </Link>
                            )}

                            {mounted && role && role !== 'manager' && (
                                <Link href="/applies" onClick={closeMenu}>
                                    Отклики
                                </Link>
                            )}

                            <a
                                href="https://www.linkedin.com/in/-mikhail-ivannikov/"
                                onClick={closeMenu}
                            >
                                Помощь
                            </a>
                        </nav>

                        <div className="header-actions">
                            {mounted && role === 'manager' && (
                                <Link
                                    className="header-button header-button--green"
                                    href="/create-vacancy"
                                    onClick={closeMenu}
                                >
                                    Создать воркшоп
                                </Link>
                            )}

                            {mounted && role && role !== 'manager' && (
                                <Link
                                    className="header-button header-button--green"
                                    href="/create-resume"
                                    onClick={closeMenu}
                                >
                                    Создать резюме
                                </Link>
                            )}

                            {mounted && !isAuth && (
                                <Link
                                    className="header-button"
                                    href="/login"
                                    onClick={closeMenu}
                                >
                                    Войти
                                </Link>
                            )}

                            {mounted && isAuth && (
                                <button
                                    className="header-button"
                                    type="button"
                                    onClick={handleLogOut}
                                >
                                    Выйти
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
