const baseUrl = 'https://education.imn.kz'

export default async function sitemap() {
  const pages = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/vacancy/public`,
      { next: { revalidate: 3600 } }
    )

    if (!response.ok) return pages

    const vacancies = await response.json()

    const vacancyPages = vacancies.map((vacancy) => ({
      url: `${baseUrl}/vacancy/${vacancy.id}`,
      lastModified: vacancy.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

    return [...pages, ...vacancyPages]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return pages
  }
}