'use client'

import Link from 'next/link'
import { useSession } from '@/lib/auth-client'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="container-tight flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 smooth-transition">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          ShopHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-secondary hover:text-foreground smooth-transition">
            Products
          </Link>
          <Link href="/cart" className="text-secondary hover:text-foreground smooth-transition">
            Cart
          </Link>
          {session?.user ? (
            <>
              <Link href="/account" className="text-secondary hover:text-foreground smooth-transition">
                Account
              </Link>
              <form
                action={async () => {
                  'use server'
                  // Sign out logic
                }}
              >
                <button type="submit" className="btn-base btn-secondary">
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="btn-base btn-outline">
                Sign In
              </Link>
              <Link href="/sign-up" className="btn-base btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container-tight flex flex-col gap-4 py-4">
            <Link href="/products" className="text-secondary hover:text-foreground smooth-transition">
              Products
            </Link>
            <Link href="/cart" className="text-secondary hover:text-foreground smooth-transition">
              Cart
            </Link>
            {session?.user ? (
              <>
                <Link href="/account" className="text-secondary hover:text-foreground smooth-transition">
                  Account
                </Link>
                <button className="btn-base btn-secondary w-full">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="btn-base btn-outline w-full">
                  Sign In
                </Link>
                <Link href="/sign-up" className="btn-base btn-primary w-full">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
