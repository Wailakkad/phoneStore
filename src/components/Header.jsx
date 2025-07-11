'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { ShoppingCart, Home, Package } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import gsap from 'gsap'
import "@/app/globals.css"

export default function Header() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)
  const cartRef = useRef(null)

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Products', icon: Package },
  ]

  useEffect(() => {
    const header = headerRef.current
    const logo = logoRef.current
    const nav = navRef.current
    const cart = cartRef.current

    // Initial animation on mount
    gsap.set([logo, nav, cart], { opacity: 0, y: -20 })
    
    gsap.timeline()
      .to(header, { 
        duration: 0.6, 
        backdropFilter: 'blur(2px)',
        ease: 'power2.out' 
      })
      .to(logo, { 
        duration: 0.5, 
        opacity: 1, 
        y: 2, 
        ease: 'power2.out' 
      }, '-=0.3')
      .to(nav, { 
        duration: 0.5, 
        opacity: 1, 
        y: 0, 
        ease: 'power2.out' 
      }, '-=0.2')
      .to(cart, { 
        duration: 0.5, 
        opacity: 1, 
        y: 0, 
        ease: 'power2.out' 
      }, '-=0.2')

    // Hover animations for nav items
    const navLinks = nav.querySelectorAll('.nav-link')
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { 
          scale: 1.05, 
          duration: 0.3, 
          ease: 'power2.out' 
        })
      })
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { 
          scale: 1, 
          duration: 0.3, 
          ease: 'power2.out' 
        })
      })
    })

    // Cart hover animation
    cart.addEventListener('mouseenter', () => {
      gsap.to(cart, { 
        scale: 1.1, 
        duration: 0.3, 
        ease: 'power2.out' 
      })
    })
    
    cart.addEventListener('mouseleave', () => {
      gsap.to(cart, { 
        scale: 1, 
        duration: 0.3, 
        ease: 'power2.out' 
      })
    })

    // Scroll animation
    const handleScroll = () => {
      const scrollY = window.scrollY
      gsap.to(header, { 
        duration: 0.3 
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      
      
      <header className="header" ref={headerRef}>
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <Link href="/" className="LLogo" ref={logoRef}>
              <span>BadarPhone</span>
            </Link>

            {/* Navigation */}
            <nav className="nav" ref={navRef}>
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link ${pathname === href ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="cart-section">
              <Link
                href="/cart"
                className={`cart-link ${pathname === '/cart' ? 'active' : ''}`}
                ref={cartRef}
              >
                <ShoppingCart size={20} />
                <span className="cart-text">Cart</span>
                {totalItems > 0 && (
                  <span className="cart-badge">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Navigation Button */}
              <button className="mobile-menu-btn">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}