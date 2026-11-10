'use client'

import Header from '@/components/header'
import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVacancyById } from '@/app/store/slices/vacancySlice'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { END_POINT } from '@/config/end-point'
import { getMyResumes } from '@/app/store/slices/resumeSlice'
import {
    createApply,
    getEmployeeApplies,
    getVacancyApplies
} from '@/app/store/slices/applySlice'
import { formatDateTime } from '@/app/utils/format'
import AdsterraBanner from '@/components/AdsterraBanner'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

function getYouTubeEmbedUrl(value) {
    try {
        const url = new URL(value)
        let videoId = null

        if (url.hostname === 'youtu.be') {
            videoId = url.pathname.slice(1).split('/')[0]
        } else if (
            ['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)
        ) {
            if (url.pathname === '/watch') {
                videoId = url.searchParams.get('v')
            } else if (
                url.pathname.startsWith('/shorts/') ||
                url.pathname.startsWith('/embed/')
            ) {
                videoId = url.pathname.split('/')[2]
            }
        }

        return videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId)
            ? `https://www.youtube-nocookie.com/embed/${videoId}`
            : null
    } catch {
        return null
    }
}

export default function VacancyPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const vacancy = useSelector((state) => state.vacancy.vacancy)
    const currentUser = useSelector((state) => state.auth.currentUser)

    const mounted = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    )

    const resumes = useSelector((state) => state.resume.resumes)
    const applies = useSelector((state) => state.apply.applies)

    const [resumeId, setResume] = useState()
    const selectedResumeId = resumeId ?? resumes[0]?.id

    useEffect(() => {
        dispatch(getVacancyById(id))
    }, [dispatch, id])

    useEffect(() => {
        if (!currentUser) return

        if (currentUser.role.name === 'employee') {
            dispatch(getMyResumes())
            dispatch(getEmployeeApplies())
        } else {
            dispatch(getVacancyApplies(id))
        }
    }, [currentUser, dispatch, id])

    const handleApply = () => {
        dispatch(createApply({
            resumeId: selectedResumeId,
            vacancyId: id
        }))
    }

    const isApplied = applies.some((item) => item.vacancyId === Number(id))
    const materials = Array.isArray(vacancy.materials) ? vacancy.materials : []

    return (
        <main>
            <Header />

            <div className="container">
                {mounted && currentUser && currentUser.id === vacancy.userId && (
                    <div className="flex flex-ai-c flex-js-sb ptb7">
                        <Link className="link" href="/vacancy">
                            К списку воркшопов
                        </Link>
                        <Link
                            className="button button-secondary-bordered"
                            href={`/edit-vacancy/${vacancy.id}`}
                        >
                            Редактировать
                        </Link>
                    </div>
                )}

                <div className="card card-workshop mt7">
                    {vacancy.branding_photo && (
                        <p>
                            <Image
                                src={`${END_POINT}${vacancy.branding_photo}`}
                                alt={vacancy.name ?? 'Фото воркшопа'}
                                width={1376}
                                height={400}
                                
                            />
                        </p>
                    )}

                    <Link href={`/vacancy/${id}/applies`} className="link">
                        Участники: {applies.length}
                    </Link>

                    <h1>{vacancy.name}</h1>
                    <p>{vacancy.about_company}</p>

                    {mounted && currentUser?.role?.name === 'employee' && (
                        <select
                            className="input mtb4"
                            value={selectedResumeId ?? ''}
                            onChange={(e) => setResume(e.target.value)}
                            style={{ maxWidth: '200px' }}
                        >
                            {resumes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.first_name} {item.last_name}
                                </option>
                            ))}
                        </select>
                    )}

                    {mounted && currentUser && currentUser.id !== vacancy.userId && !isApplied && (
                        <button
                            className="button button-primary"
                            onClick={handleApply}
                        >
                            Записаться на воркошп
                        </button>
                    )}

                    {mounted && currentUser && currentUser.id !== vacancy.userId && isApplied && (
                        <Link
                            className="button button-primary"
                            style={{ maxWidth: '200px' }}
                            href="/applies"
                        >
                            Моя запись
                        </Link>
                    )}
                </div>

                {vacancy.company && (
                    <p className="secondary mt7">
                        <b>{vacancy.company.name}</b>
                    </p>
                )}
                {vacancy.company && (
                    <p className="secondary">{vacancy.company.description}</p>
                )}

                <div
                    className="secondary"
                    dangerouslySetInnerHTML={{ __html: vacancy.description ?? '' }}
                />

                {vacancy.event_date && (
                    <p className="secondary">
                        Дата: {formatDateTime(vacancy.event_date)}
                    </p>
                )}

                {vacancy.address && (
                    <p className="secondary">
                        Адрес: {vacancy.address}
                    </p>
                )}

                {materials.length > 0 && (
                    <section className="mt7 card-materials">
                        <h2>К воркшопу</h2>

                        {materials.map((material, index) => {
                            const embedUrl = getYouTubeEmbedUrl(material)

                            return (
                                <div key={`${material}-${index}`} className="mtb4">
                                    <p>
                                        <a
                                            className="link"
                                            href={material}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {material}
                                        </a>
                                    </p>

                                    {embedUrl && (
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '100%',                                                
                                                aspectRatio: '16 / 9'
                                            }}
                                        >
                                            <iframe
                                                src={embedUrl}
                                                title={`Видео с воркшопа ${index + 1}`}
                                                loading="lazy"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 0
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </section>
                )}
                <AdsterraBanner />
            </div>
        </main>
    )
}
