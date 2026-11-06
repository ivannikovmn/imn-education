import Header from '../components/header'
import Link from 'next/link'

async function getPublicVacancies() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/vacancy/public`,
      { next: { revalidate: 60 } }
    )

    if (!response.ok) return []

    return await response.json()
  } catch (error) {
    console.error('Failed to load public vacancies:', error)
    return []
  }
}

export default async function Home() {
  const vacancies = await getPublicVacancies()

  return (
    <main>
      <Header />

      <section className="container">
        <h1>Открытые воркшопы</h1>

        {vacancies.length > 0 ? (
          <div className="grid">
            {vacancies.map((vacancy) => (
              <article key={vacancy.id}>
                <p>{vacancy.name}</p>
                <Link className="link" href={`/vacancy/${vacancy.id}`}>
                  Подробнее
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p>Сейчас нет доступных воркшопов</p>
        )}
      </section>
    </main>
  )
}