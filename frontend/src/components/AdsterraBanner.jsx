'use client'

import { useEffect, useState } from 'react'

export default function AdsterraBanner() {
    const [isMobile, setIsMobile] = useState(null)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)')

        const updateScreen = () => setIsMobile(mediaQuery.matches)

        updateScreen()
        mediaQuery.addEventListener('change', updateScreen)

        return () => {
            mediaQuery.removeEventListener('change', updateScreen)
        }
    }, [])

    useEffect(() => {
        if (isMobile === null) return

        const width = isMobile ? 320 : 728
        const height = isMobile ? 50 : 90
        const key = isMobile
            ? '65bb0d426d624684eda36ac92c84a608'
            : 'b5190b5c6f5501cf2740b6e6ba04f011'

        const container = document.getElementById('adsterra-banner')
        if (!container) return

        container.innerHTML = ''

        const scriptOptions = document.createElement('script')
        scriptOptions.text = `
            atOptions = {
                'key': '${key}',
                'format': 'iframe',
                'height': ${height},
                'width': ${width},
                'params': {}
            };
        `

        const script = document.createElement('script')
        script.src = `https://bauval.org/22/${key}`
        script.async = true

        container.appendChild(scriptOptions)
        container.appendChild(script)

        return () => {
            container.innerHTML = ''
        }
    }, [isMobile])

    return (
        <div
            style={{
                width: '100%',
                margin: '32px auto 16px',
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    maxWidth: 728,
                    margin: '0 auto 8px',
                    padding: '0 4px',
                    color: 'rgba(0, 0, 0, 0.45)',
                    fontSize: 12,        
                    textAlign: 'right'          
                }}
            >
                Реклама
            </div>

            <div
                id="adsterra-banner"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: isMobile === null ? 0 : isMobile ? 50 : 90,
                }}
            />
        </div>
    )
}