import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, personalInfo } from '../data/portfolio'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)

        const sections = navLinks.map((l) => l.id)
        for (const id of [...sections].reverse()) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 120) {
            setActiveSection(id)
            break
          }
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,padding] duration-200 ${
          scrolled ? 'glass py-3' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl font-bold tracking-tight hover:text-accent-glow transition-colors"
          >
            VG<span className="text-accent">.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm transition-colors relative ${
                  activeSection === link.id ? 'text-white' : 'text-white/45 hover:text-white/80'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-cyan-glow/70" />
                )}
              </button>
            ))}
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full glass border border-white/[0.1] hover:border-cyan-glow/30 transition-colors duration-150"
            >
              Resume
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full bg-accent hover:bg-accent-glow transition-colors duration-150"
            >
              Contact
            </a>
          </div>

          <button
            className="md:hidden text-white/70"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-surface/95 pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg text-white/70 hover:text-white"
              >
                {link.label}
              </button>
            ))}
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left text-lg text-cyan-glow"
            >
              Resume
            </a>
            <a href={`mailto:${personalInfo.email}`} className="text-left text-lg text-accent">
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  )
}
