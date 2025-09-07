import { useEffect, useState } from 'react'

export default function usePageQuery<T = string>(initValue: T) {
  const [page, setPage] = useState<T>(initValue)

  useEffect(() => {
    const handler = () => {
      const params = new URLSearchParams(window.location.search)
      const value = params.get('page')
      setPage((value as T) ?? initValue)
    }
    handler()

    globalThis.addEventListener('popstate', handler)

    return () => {
      globalThis.removeEventListener('popstate', handler)
    }
  }, [initValue])

  return page
}
