import { headers } from 'next/headers'
import { getSiteUrl } from './site'

function isAllowedHost(host: string): boolean {
  const allowed = new URL(getSiteUrl()).hostname
  return host === allowed || host === `www.${allowed}` || host.endsWith('.localhost')
}

export async function getSiteUrlFromRequest(): Promise<string> {
  try {
    const h = await headers()
    const host = (h.get('x-forwarded-host') ?? h.get('host'))?.split(',')[0]?.trim()
    if (!host || !isAllowedHost(host)) return getSiteUrl()
    const proto = h.get('x-forwarded-proto') ?? 'https'
    return `${proto}://${host}`
  } catch {
    return getSiteUrl()
  }
}
