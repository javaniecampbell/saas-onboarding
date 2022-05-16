import Head from 'next/head'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  LogoutIcon,
  CogIcon,
  CreditCardIcon,
  XIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Teams', href: '/teams', icon: UsersIcon, current: false },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Billing', href: '/billing', icon: CreditCardIcon, current: false },
  { name: 'Settings', href: '/settings', icon: CogIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
  { name: 'Logout', href: '/api/auth/logout', icon: LogoutIcon, current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Layout({ children, title }: { children?: React.ReactNode, title?: string}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoading } = useUser()
  return (
    <>
      <Head>
        <title>SaaS Onboarding</title>
        <meta name="description" content="SaaS Onboarding app for B2B customers through a third party and subscriptions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <div className="h-8 w-auto relative">
                      <Image
                        layout='fill'
                        objectFit='cover'
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                        alt="Workflow"
                      />
                    </div>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name + '-mobile'}>
                        <a
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex bg-gray-700 p-4">
                  <Link href={'/profile'}>
                    <a className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div>
                          <div className="inline-block h-10 w-10 rounded-full relative">
                            <Image
                              className='rounded-full'
                              layout='fill'
                              objectFit='contain'
                              src={isLoading ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" : user?.picture!}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">{isLoading ? 'Loading...' : user?.name}</p>
                          <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="h-8 w-auto relative">
                  <Image
                    layout='fill'
                    objectFit='contain'
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name + 'wide'}>
                    <a
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
              <Link href={'/profile'}>
                <a className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <div className="inline-block h-9 w-9 rounded-full relative">
                        <Image
                          className="rounded-full"
                          layout="fill"
                          objectFit="contain"
                          loading='lazy'
                          src={isLoading ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" : user?.picture!}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{isLoading ? 'Loading...' : user?.name}</p>
                      <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{title ?? 'Dashboard'}</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout