'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '@/app/store/slices/authSlice'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export default function ProtectedRoute({ children }) {
    const router = useRouter()
    const dispatch = useDispatch()

    const mounted = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    )

    const { isAuth, currentUser, tokenExt } = useSelector(
        state => state.auth
    )

    const isAuthorized = mounted && isAuth && Boolean(tokenExt)
    const loginPath = currentUser?.role?.name === 'employee'
        ? '/login'
        : '/employer/signin'

    useEffect(() => {
        if (!mounted) return

        if (!isAuth || !tokenExt) {
            router.replace(loginPath)
            return
        }

        const delay = tokenExt * 1000 - Date.now()

        const expireSession = () => {
            dispatch(logOut())
            router.replace(loginPath)
        }

        if (delay <= 0) {
            expireSession()
            return
        }

        const timeoutId = setTimeout(expireSession, delay)

        return () => clearTimeout(timeoutId)
    }, [mounted, isAuth, tokenExt, loginPath, dispatch, router])

    if (!isAuthorized) {
        return null
    }

    return <>{children}</>
}
