"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { END_POINT } from "@/config/end-point"
import Image from 'next/image'
import logo from '../../../images/logo.svg'
import { formatDate } from '@/app/utils/format'

export default function CertificatePage() {

    const { userId, vacancyId } = useParams()
    const [certificate, setCertificate] = useState(null)

    useEffect(() => {
        axios.get(`${END_POINT}/certificate/${userId}/${vacancyId}`)
            .then(res => {
                setCertificate(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [userId, vacancyId])

    if (!certificate) {
        return <div>Загрузка...</div>
    }

return (
    <main className="certificate-page">
        <div className="certificate">
            <div className="certificate-header">
                <p className="certificate-logo">
                    <Image
                        src={logo}
                        alt="IMN Education"
                    />
                </p>

                <div className="certificate-title">
                    Сертификат
                </div>
            </div>

            <div className="certificate-content">
                <p className="certificate-label">
                    Настоящим подтверждается, что
                </p>

                <h1 className="certificate-participant">
                    {certificate.participant}
                </h1>

                <p className="certificate-label">
                    принял(а) участие в изучении воркшопа
                </p>

                <h2 className="certificate-event">
                    {certificate.event}
                </h2>

                {certificate.updatedAt && (
                    <div className="certificate-details">
                        {formatDate(certificate.updatedAt)}
                    </div>
                )}
            </div>

            <div className="certificate-footer">
                <p>О спикере: {certificate.about_company}</p>                            
            </div>  

        </div>
    </main>
)
}