import {
  type ChangeEvent,
  type FormEvent,
  useId,
  useState,
} from 'react'
import '../pages/ContactPage.css'

export const CONTACT_EXPERIENCE_TYPES = [
  'Campus Events',
  'HR & Team Building',
  'Corporate Activations',
  'Adventure Experiences',
  'Community Engagement',
  'Trade Shows',
  'Other',
] as const

type ContactHeroSlideProps = {
  /** Homepage embeds hero as secondary section — use headingLevel 2 to avoid duplicate h1 */
  headingLevel?: 1 | 2
  /** Anchors `#contact` (home full-page scroll). */
  sectionId?: string
}

/** Reference layout: headline, vine ornament, subtitle – one full viewport. */
export function ContactHeroSlide({ headingLevel = 1, sectionId }: ContactHeroSlideProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <section
      id={sectionId}
      className="contact-hero fullpage-section"
      aria-labelledby="contact-hero-heading"
    >
      <img className="contact-hero-vine" src="/getintouch-1.png" alt="" aria-hidden />
      <div className="contact-hero-content">
        <Heading className="contact-hero-title" id="contact-hero-heading">
          GET IN TOUCH WITH <span className="contact-hero-title-accent">US</span>
        </Heading>
        <p className="contact-hero-subtitle">
          Experiences built with intention where connection feels natural and lasting.
        </p>
      </div>
    </section>
  )
}

/** Reference layout: copy left, mandala + form card right. */
export function ContactFormSlide() {
  const idPrefix = useId()
  const [formData, setFormData] = useState({
    experienceType: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const fieldId = (name: string) => `${idPrefix}-${name}`

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
  }

  return (
    <section className="contact-main fullpage-section" aria-label="Contact form">
      <img className="contact-main-vine" src="/getintouch-1.png" alt="" aria-hidden />
      <div className="contact-main-container">
        <div className="contact-info">
          <h2 className="contact-info-heading">GET IN TOUCH WITH US</h2>
          <p className="contact-info-p">
            Occasional stories, ideas, and moments that show how meaningful experiences come to life.
          </p>
          <h3 className="contact-info-subheading">FOR GENERAL QUERIES</h3>
          <p className="contact-info-p">
            Occasional stories, ideas, and moments that show how meaningful experiences come to life.
          </p>
        </div>

        <div className="contact-form-column">
          <div className="contact-mandala-wrap" aria-hidden>
            <img className="contact-mandala-img" src="/getintouch-2.png" alt="" />
          </div>
          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-field">
                <label htmlFor={fieldId('experienceType')}>Select the Type of experience</label>
                <select
                  id={fieldId('experienceType')}
                  name="experienceType"
                  value={formData.experienceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose an experience type</option>
                  {CONTACT_EXPERIENCE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="contact-form-field">
                <label htmlFor={fieldId('name')}>Your Name</label>
                <input
                  type="text"
                  id={fieldId('name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor={fieldId('email')}>Email Address</label>
                <input
                  type="email"
                  id={fieldId('email')}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor={fieldId('phone')}>Phone Number</label>
                <input
                  type="tel"
                  id={fieldId('phone')}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
              <div className="contact-form-field">
                <label htmlFor={fieldId('message')}>Message</label>
                <textarea
                  id={fieldId('message')}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder=""
                />
              </div>
              <button type="submit" className="contact-form-submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
