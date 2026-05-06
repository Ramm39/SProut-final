import { EXPERIENCE_MASONRY_GALLERY } from '../data/experienceCollageImages'
import './ExperienceCollageSection.css'

export default function ExperienceCollageSection() {
  return (
    <section
      className="experience-collage"
      aria-label="Experience gallery"
    >
      <div className="experience-collage-inner">
        <div className="experience-masonry-grid">
          {EXPERIENCE_MASONRY_GALLERY.map((col) => (
            <div
              key={col.id}
              className={`experience-masonry-col experience-masonry-col--${col.id}`}
              style={{ transform: `translateY(${col.translateYPct}%)` }}
            >
              {col.cells.map((cell, idx) => (
                <div
                  key={`${col.id}-${idx}`}
                  className="experience-masonry-cell"
                  style={{ aspectRatio: cell.aspectRatio }}
                >
                  <img
                    src={cell.src}
                    alt={cell.alt}
                    className="experience-masonry-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
