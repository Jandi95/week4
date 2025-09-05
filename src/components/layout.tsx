import { type ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <header className="py-7 border-b border-[rgba(255,255,255,0.07)]">
        <h1 className="text-4xl font-bold text-center">PLATFORM</h1>
      </header>
      <main>{children}</main>
      <footer className="mt-auto bg-[#1f1f1f] text-center py-5">
        <small>© PLATFORM All Rights Reserved.</small>
      </footer>
    </div>
  )
}
