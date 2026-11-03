import { test, expect } from '@playwright/test'

test('home page displays the IMN Education header', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('img', { name: 'imn-education' })
  ).toBeVisible()

  await expect(
    page.getByRole('link', { name: 'Помощь' })
  ).toBeVisible()
})