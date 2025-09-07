import { type JSX, useEffect } from 'react'
import { Main, Profile, SignIn, SignUp } from '@/pages'
import { Layout } from './components'
import usePageQuery from './hooks/use-page-query'
import { type Page } from './pages/nav'

export default function App() {
  const page = usePageQuery<Page>('profile')

  useEffect(() => {
    const url = new URL(globalThis.location.href)
    url.searchParams.set('page', String(page))
    window.history.pushState({}, '', url.toString())
  }, [page])

  let renderPage: JSX.Element | null = null
  switch (page) {
    case 'main':
      renderPage = <Main />
      break
    case 'signin':
      renderPage = <SignIn />
      break
    case 'signup':
      renderPage = <SignUp />
      break
    case 'profile':
      renderPage = <Profile />
      break
  }

  return <Layout>{renderPage}</Layout>
}
