import NavLink, { NavItem } from '@/components/nav-link'
import navSet from '@/utils/nav-set'

export type Page = 'signin' | 'signup' | 'profile'

const PAGES_DEFAULT: NavItem[] = [
  { path: 'signup', text: 'Sign Up' },
  { path: 'signin', text: 'Sign In' },
]

const PAGES_USER: NavItem[] = [{ path: 'profile', text: 'Profile' }]

export default function Nav() {
  // 임시
  const user = false

  const RenderPageNav = user ? PAGES_USER : PAGES_DEFAULT

  const handleLogout = () => {
    navSet('signin')
  }

  return (
    <nav className="ml-auto">
      <ul className="flex flex-row gap-5">
        {RenderPageNav.map((item) => (
          <li key={item.path}>
            <NavLink item={item} />
          </li>
        ))}
        {user && (
          <li>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
