import { type ReactNode } from 'react'
import { type SupaProfile } from '@/libs/supabase'
import { Nav } from '@/pages'

interface Props {
  children: ReactNode
  user: SupaProfile | null
}

export default function Layout({ children, user }: Props) {
  return (
    <div className="min-h-screen relative pb-[68px]">
      <header className="relative h-[90px] border-b border-[rgba(255,255,255,0.07)] flex flex-row items-center w-full px-8">
        <h1 className="absolute bottom-1/2 right-1/2 translate-1/2 text-2xl font-bold">
          PLATFORM
        </h1>
        <Nav user={user} />
      </header>
      <main>{children}</main>
      <footer className="mt-auto bg-[#1f1f1f] text-center py-5 absolute left-0 bottom-0 w-full">
        <small>© PLATFORM All Rights Reserved.</small>
      </footer>
    </div>
  )
}
