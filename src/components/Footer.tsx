import { motion } from 'framer-motion'

import { ArrowUp } from 'lucide-react'

import { navLinks, personalInfo } from '../data/portfolio'

import { Magnetic } from './Magnetic'

import { LusionCrossRow } from './LusionCross'



export function Footer() {

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })



  return (

    <footer className="relative py-16 px-6 md:px-10 bg-white text-surface overflow-hidden">

      <div className="absolute inset-x-0 top-0">

        <LusionCrossRow count={5} className="opacity-30" color="black" />

      </div>



      <div className="max-w-6xl mx-auto relative z-10 pt-8">

        <div className="grid md:grid-cols-12 gap-12 md:gap-8">

          <div className="md:col-span-6 space-y-8">

            <div>

              <p className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-none">

                VG<span className="text-accent">.</span>

              </p>

              <p className="text-sm text-surface/50 mt-4 max-w-xs leading-relaxed">

                © {new Date().getFullYear()} {personalInfo.name}. Built with React, Framer Motion & Three.js.

              </p>

            </div>



            <div className="grid sm:grid-cols-2 gap-8 text-sm">

              <div>

                <p className="uppercase tracking-wider text-surface/40 text-xs mb-3">Contact</p>

                <a

                  href={`mailto:${personalInfo.email}`}

                  className="block hover:opacity-70 transition-opacity"

                >

                  {personalInfo.email}

                </a>

                <p className="mt-2 text-surface/60">{personalInfo.location}</p>

              </div>

              <div>

                <p className="uppercase tracking-wider text-surface/40 text-xs mb-3">Links</p>

                <a

                  href={personalInfo.github}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="block hover:opacity-70 transition-opacity"

                >

                  GitHub

                </a>

                <a

                  href={personalInfo.linkedin}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="block mt-2 hover:opacity-70 transition-opacity"

                >
                  LinkedIn

                </a>

              </div>

            </div>

          </div>



          <div className="md:col-span-6 flex flex-col justify-between">

            <div>

              <p className="font-display text-2xl md:text-3xl font-bold leading-tight max-w-md">

                Open to ambitious engineering roles and collaborations.

              </p>

            </div>



            <nav className="flex flex-wrap gap-x-6 gap-y-3 mt-10 md:mt-0">

              {navLinks.map((link) => (

                <button

                  key={link.id}

                  onClick={() =>

                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })

                  }

                  className="font-mono text-xs uppercase tracking-wider text-surface/40 hover:text-surface transition-colors"

                >

                  {link.label}

                </button>

              ))}

            </nav>

          </div>

        </div>



        <div className="mt-16 pt-8 border-t border-surface/10 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="font-mono text-xs text-surface/35">IIT Goa · CSE &apos;26</p>



          <Magnetic strength={0.2}>

            <motion.button

              onClick={scrollToTop}

              whileHover={{ y: -3 }}

              className="flex items-center justify-center w-14 h-14 rounded-full bg-surface text-white hover:bg-surface/90 transition-colors"

              aria-label="Back to top"

            >

              <ArrowUp size={18} />

            </motion.button>

          </Magnetic>

        </div>

      </div>

    </footer>

  )

}

