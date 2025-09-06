import type { Page } from '@/pages/nav'

export default function navSet<T = Page>(page: T) {
  const url = new URL(window.location.href)
  url.searchParams.set('page', String(page))
  globalThis.history.pushState({}, '', url.toString())

  globalThis.dispatchEvent(new PopStateEvent('popstate'))
}
