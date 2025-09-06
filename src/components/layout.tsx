import { type ReactNode } from 'react'
import { Nav } from '@/pages'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <header className="relative h-[90px] border-b border-[rgba(255,255,255,0.07)] flex flex-row items-center w-full px-8">
        <h1 className="absolute bottom-1/2 right-1/2 translate-1/2 text-2xl font-bold">
          PLATFORM
        </h1>
        <Nav />
      </header>
      <main>{children}</main>
      <footer className="mt-auto bg-[#1f1f1f] text-center py-5">
        <small>© PLATFORM All Rights Reserved.</small>
      </footer>
    </div>
  )
}
