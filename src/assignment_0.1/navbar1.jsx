
import React from"react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { ChevronDownIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Study Abroad', href: '#', current:false },
  { name: 'MBBS Abroad', href: '#', current: false },
  { name: 'Aviation', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Gallery', href: '#', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Contract', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar1(props) {
    const {user}=props;
    return (
    <Disclosure as="div" className="">
      <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
                <Link to="/home">
                    <img
                        key="img1"
                        prop=""
                        alt=""
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="h-8 w-auto"
                    />
                </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <ul className="flex space-x-4">
                {navigation.map((item) => (
                  <li
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-black-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-lg font-medium',
                    )}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            <Menu as="div" className="relative ml-3">
              <ul className="flex space-x-4 ">
                {user!=null && user.role==="admin" ?
                    <React.Fragment>
                        <li className="nav-item">
                          <div>
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                              {user.role}
                              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>
                          </div>

                          <MenuItems
                            transition
                            className="absolute right-1 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                          >
                            <div className="py-1">
                              <MenuItem>
                                <a
                                  href="/admin/users"
                                  className="block px-4 py-2 text-sm text-gray-400 data-focus:bg-gray-100 data-focus:text-gray-400 data-focus:outline-hidden"
                                >
                                  Students
                                </a>
                              </MenuItem>
                              <MenuItem>
                                <a
                                  href="/admin/users"
                                  className="block px-4 py-2 text-sm text-gray-400 data-focus:bg-gray-100 data-focus:text-gray-400 data-focus:outline-hidden"
                                >
                                  Agents
                                </a>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </li>
                        <li className="nav-item mt-2">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                    </React.Fragment>:
                user!=null && user.role==="agent"?
                    <React.Fragment>
                        <li className="nav-item">
                            Agent {user.name}
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                    </React.Fragment>:
                user!=null && user.role==="student"?
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">Student {user.name}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                    </React.Fragment>:
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    </React.Fragment>} 
              </ul>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}