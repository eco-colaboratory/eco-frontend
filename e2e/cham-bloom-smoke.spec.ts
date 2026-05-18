import { test, expect } from '@playwright/test'
import path from 'path'

test.describe('CHẠM Bloom landing', () => {
  test('renders sponsor page sections', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/CHẠM Bloom/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    await page.locator('#sponsorship').scrollIntoViewIfNeeded()
    for (const name of [
      'Đơn vị đồng hành',
      'Bảo trợ truyền thông',
      'Hạt Mầm',
      'Mầm Xanh',
      'Vườn Xanh',
      'Nở Xanh',
    ]) {
      await expect(page.getByRole('heading', { name })).toBeVisible()
    }

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(page.locator('#contact').getByRole('link', { name: 'Liên hệ ngay', exact: true })).toBeVisible()

    const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1)

    const screenshotDir = path.join('e2e', 'screenshots')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.screenshot({ path: path.join(screenshotDir, 'cham-bloom-desktop.png'), fullPage: true })

    await page.setViewportSize({ width: 390, height: 844 })
    await page.screenshot({ path: path.join(screenshotDir, 'cham-bloom-mobile.png'), fullPage: true })
  })
})
