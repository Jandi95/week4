import { type MouseEvent } from 'react'
import { type Page } from '@/pages/nav'
import navSet from '@/utils/nav-set'

export interface NavItem {
  path: Page
  text: string
  authRequired?: boolean
}

interface NavLinkProps {
  item: NavItem
}

export default function NavLink({ item }: NavLinkProps) {
  const handleLink = (pageName: Page) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const aEL = e.target as HTMLAnchorElement
    if (aEL.getAttribute('aria-disabled') === 'true') return

    navSet(pageName)
  }

  return (
    <a href={`/?page=${item.path}`} onClick={handleLink(item.path)}>
      {item.text}
    </a>
  )
}
