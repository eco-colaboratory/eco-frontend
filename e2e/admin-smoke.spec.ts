import { test, expect } from '@playwright/test'

const ADMIN_ROUTES = [
  '/admin/dashboard',
  '/admin/users',
  '/admin/items',
  '/admin/decors',
  '/admin/synergies',
  '/admin/flower-templates',
] as const

test.describe('Admin routes', () => {
  test('redirect unauthenticated users to login', async ({ page }) => {
    for (const route of ADMIN_ROUTES) {
      await page.goto(route)
      await expect(page).toHaveURL(/\/login/)
    }
  })
})
