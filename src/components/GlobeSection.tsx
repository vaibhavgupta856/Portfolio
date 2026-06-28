import { SectionHeading } from './SectionHeading'
import { Globe3D, type GlobeMarker } from '@/components/ui/3d-globe'

const markers: GlobeMarker[] = [
  {
    lat: 12.9716,
    lng: 77.5946,
    src: '/markers/bengaluru.svg',
    label: 'Bengaluru — Siemens EDA',
    href: 'https://eda.sw.siemens.com/en-US/',
  },
  {
    lat: 15.2993,
    lng: 74.124,
    src: '/markers/iit-goa.svg',
    label: 'IIT Goa — CSE',
    href: 'https://www.iitgoa.ac.in/',
  },
]

export function GlobeSection() {
  return (
    <section id="globe" className="relative w-full py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Globe" title="Locations" />

        <div className="relative w-full h-[min(75vh,640px)] min-h-[480px]">
          <Globe3D
            className="h-full w-full"
            markers={markers}
            config={{
              showAtmosphere: true,
              atmosphereColor: '#818cf8',
              atmosphereIntensity: 0.5,
              atmosphereBlur: 3,
              bumpScale: 5,
              autoRotateSpeed: 0.4,
              enableZoom: true,
              enablePan: false,
              minDistance: 4,
              maxDistance: 14,
              ambientIntensity: 1.4,
              pointLightIntensity: 2.5,
            }}
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-mono">
          {markers.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gradient-subtle hover:scale-105 transition-transform inline-block"
            >
              ◆ {m.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
