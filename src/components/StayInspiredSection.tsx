import { useState } from 'react'
import './StayInspiredSection.css'

export default function StayInspiredSection() {
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <section className="stay-inspired-section" aria-labelledby="stay-inspired-heading">
      <div className="stay-inspired-container">
        {/* Layers (bottom → top): 1) card surface 2) copy 3) mandala asset */}
        <div className="stay-inspired-content">
          <h2 id="stay-inspired-heading" className="stay-inspired-title">
            STAY INSPIRED
          </h2>
          <p className="stay-inspired-subtitle">
            Occasional stories, ideas, and moments that show how meaningful experiences come to life.
          </p>

          <form
            className="stay-inspired-form"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <div className={`stay-inspired-field-wrap ${focused ? 'stay-inspired-field-focused' : ''}`}>
              <input
                type="email"
                id="stay-inspired-email"
                className="stay-inspired-input"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                aria-label="Email address for newsletter"
                autoComplete="email"
              />
            </div>
            <button type="submit" className="stay-inspired-cta">
              STAY IN THE LOOP →
            </button>
          </form>

          <p className="stay-inspired-disclaimer">
            We only share what&apos;s worth your time. No noise. No pressure.
          </p>
        </div>

        <img
          className="stay-inspired-ornament"
          src="/stay-inspired-mandala.png"
          alt=""
          decoding="async"
          draggable={false}
        />
      </div>
    </section>
  )
}
