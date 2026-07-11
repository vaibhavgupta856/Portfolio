import { AppErrorBoundary } from './components/AppErrorBoundary'
import { SmoothScroll } from './components/SmoothScroll'
import { ScrollProgress } from './components/ScrollProgress'
import { AnimatedBackground } from './components/AnimatedBackground'
import { TechMarquee } from './components/TechMarquee'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { FeaturedWorkStrip } from './components/FeaturedWorkStrip'
import { Contact } from './components/Contact'
import { FinaleSection } from './components/FinaleSection'
import { Footer } from './components/Footer'
import { ScrollReveal } from './components/ScrollReveal'
import { AmbientMusic } from './components/AmbientMusic'
import { LoadingScreen } from './components/LoadingScreen'
import { useAssetPreloader } from './hooks/useAssetPreloader'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const { ready, progress } = useAssetPreloader()

  return (
    <AppErrorBoundary>
      <AnimatePresence mode="wait">
        {!ready && <LoadingScreen key="loader" progress={progress} />}
      </AnimatePresence>

      <div
        className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!ready}
      >
        <SmoothScroll>
          <AmbientMusic />
          <ScrollProgress />
          <AnimatedBackground />
          <Navbar />

          <main className="relative z-10">
            <Hero />
            <TechMarquee />

            <ScrollReveal>
              <About />
            </ScrollReveal>

            <ScrollReveal>
              <Experience />
            </ScrollReveal>

            <ScrollReveal>
              <FeaturedWorkStrip />
            </ScrollReveal>

            <ScrollReveal>
              <Skills />
            </ScrollReveal>

            <ScrollReveal>
              <Contact />
            </ScrollReveal>
          </main>
          <FinaleSection />
          <Footer />
        </SmoothScroll>
      </div>
    </AppErrorBoundary>
  )
}
