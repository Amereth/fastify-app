import { GlobalLoadingIndicator } from '@/components/global-loading-indicator'
import { PageHeader } from '@/components/page-header/PageHeader'
import { Button } from '@/components/ui/button'
import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { HomeIcon, ScrollIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Icon } from '@/components/icon'

const links = [
  {
    icon: HomeIcon,
    name: 'home',
    to: '/',
  },
  {
    icon: ScrollIcon,
    name: 'events',
    to: '/events',
  },
]

export const LayoutComponent = () => {
  return (
    <>
      <PageHeader />

      <div className='mt-4 flex grow items-stretch overflow-hidden pl-0'>
        <aside className='flex max-w-[56px] flex-col overflow-hidden border-r-[1px] pb-2 transition-all duration-500 hover:max-w-40 max-sm:max-w-[48px]'>
          <nav>
            <ul>
              {links.map(({ to, icon, name }) => (
                <li key={to}>
                  <Button variant='link'>
                    <Link to={to} className='flex items-end gap-4'>
                      <Icon icon={icon} />
                      <span>{name}</span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className='mt-auto'
            initial={{ width: '0px', height: '0px' }}
            animate={{ width: '36px', height: '36px' }}
          >
            <div className='mt-auto'>
              <GlobalLoadingIndicator />
            </div>
          </motion.div>
        </aside>

        <Outlet />
      </div>
    </>
  )
}

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  beforeLoad: ({ context }) => {
    if (!context.session) throw redirect({ to: '/login' })
  },
})
