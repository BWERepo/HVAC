import tech1 from '../assets/crew/tech-1.jpg'
import tech2 from '../assets/crew/tech-2.jpg'
import tech3 from '../assets/crew/tech-3.jpg'
import Reveal from './ui/Reveal'
import Section, { SectionHeading } from './ui/Section'

// Real sample photography (not the actual business — see the hero and team
// photos for the same convention). Alt text says so explicitly.
const photos = [
  { src: tech1, alt: 'A technician working with hand tools on site — sample demonstration photography, not the actual business.' },
  { src: tech2, alt: 'A technician operating a power tool during a repair — sample demonstration photography, not the actual business.' },
  { src: tech3, alt: 'A technician working on a wall-mounted component — sample demonstration photography, not the actual business.' },
]

export default function FieldPhotos() {
  return (
    <Section id="field-photos" accent="warm" glow={false} className="border-t border-line">
      <SectionHeading
        eyebrow="In the field"
        title="Real Work, Done Right."
        sub="A look at the kind of hands-on, detail-focused work every visit gets."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <Reveal key={photo.src} delay={i * 90}>
            <img
              src={photo.src}
              alt={photo.alt}
              className="aspect-4/5 w-full rounded-2xl object-cover shadow-lift"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
