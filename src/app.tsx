import { type JSX, useEffect, useState } from 'react'
import { Main, Profile, SignIn, SignUp } from '@/pages'
import { Layout } from './components'
import usePageQuery from './hooks/use-page-query'
import supabase, { SupaProfile } from './libs/supabase'
import { type Page } from './pages/nav'

export default function App() {
  const page = usePageQuery<Page>('main')
  const [user, setUser] = useState<SupaProfile | null>(null)

  useEffect(() => {
    const url = new URL(globalThis.location.href)
    url.searchParams.set('page', String(page))
    window.history.pushState({}, '', url.toString())
  }, [page])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ error, data }) => {
      if (error) {
        console.log(`사용자 검색 오류 : ${error}`)
      } else {
        const { error: userProfileError, data: userProfile } = await supabase
          .from('profiles')
          .select('username,email,id')
          .eq('id', data.user.id)
          .single()
        if (userProfileError) {
          console.log(`프로필 데이터 오류 ${userProfileError.message}`)
        } else {
          setUser(userProfile)
        }
      }
    })
  }, [])

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
      renderPage = <Profile user={user} />
      break
  }

  return <Layout user={user}>{renderPage}</Layout>
}
