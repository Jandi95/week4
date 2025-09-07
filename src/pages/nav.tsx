import { toast } from 'sonner'
import NavLink, { NavItem } from '@/components/nav-link'
import supabase, { type SupaProfile } from '@/libs/supabase'
import navSet from '@/utils/nav-set'

interface Props {
  user: SupaProfile | null
}

export type Page = 'signin' | 'signup' | 'profile' | 'main'

const PAGES_DEFAULT: NavItem[] = [
  { path: 'signup', text: 'Sign Up' },
  { path: 'signin', text: 'Sign In' },
]

const PAGES_USER: NavItem[] = [{ path: 'profile', text: 'Profile' }]

export default function Nav({ user }: Props) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      toast('로그아웃 되었습니다.')
      navSet('main')
    } else {
      toast.error(`로그아웃 오류 ${error.message}`)
    }
  }

  return (
    <nav className="ml-auto">
      <ul className="flex flex-row gap-5">
        {user ? (
          <>
            {PAGES_USER.map((item) => (
              <li key={item.path}>
                <NavLink item={item} />
              </li>
            ))}
            <li>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          PAGES_DEFAULT.map((item) => (
            <li key={item.path}>
              <NavLink item={item} />
            </li>
          ))
        )}
      </ul>
    </nav>
  )
}
