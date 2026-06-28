import { AppErrorBoundary } from './components/AppErrorBoundary'
import { SmoothScroll } from './components/SmoothScroll'
import { CustomCursor } from './components/CustomCursor'
import { FilmGrain } from './components/FilmGrain'
import { ScrollProgress } from './components/ScrollProgress'
import { AnimatedBackground } from './components/AnimatedBackground'
import { ScrollVideoBackground } from './components/ScrollVideoBackground'
import { TechMarquee } from './components/TechMarquee'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { LazyGlobeSection } from './components/LazyGlobeSection'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { FeaturedWorkStrip } from './components/FeaturedWorkStrip'
import { Contact } from './components/Contact'
import { SpacemanTunnelSection } from './components/SpacemanTunnelSection'
import { FinaleSection } from './components/FinaleSection'
import { Footer } from './components/Footer'
import { ScreenPaint } from './components/ScreenPaint'
import { ScrollReveal } from './components/ScrollReveal'

export default function App() {
  return (
    <AppErrorBoundary>
      <SmoothScroll>
        <CustomCursor />
        <FilmGrain />
        <ScreenPaint />
        <ScrollProgress />
        <ScrollVideoBackground />
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
            <LazyGlobeSection />
          </ScrollReveal>

          <SpacemanTunnelSection />

          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
        <FinaleSection />
        <Footer />
      </SmoothScroll>
    </AppErrorBoundary>
  )
}
