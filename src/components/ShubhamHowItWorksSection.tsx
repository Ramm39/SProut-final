import './ShubhamHowItWorksSection.css'

const ASSET_TOP_LEFT = '/Shubham-2.png'
const ASSET_SUBJECT = '/Shubham.png'

export default function ShubhamHowItWorksSection() {
  return (
    <section
      className="shubham-hitw-section"
      aria-labelledby="shubham-hitw-heading"
    >
      <div className="gemini-code-root">
        <div className="gemini-code-viewport">
          <img
            src={ASSET_TOP_LEFT}
            className="gemini-code-asset-top-left"
            alt=""
            width={860}
            height={860}
            decoding="async"
          />

          <img
            src={ASSET_SUBJECT}
            className="gemini-code-asset-subject"
            alt="Shubham — Co-founder"
            width={900}
            height={1200}
            decoding="async"
          />

          <div className="gemini-code-content-card">
            <div className="gemini-code-header">
              <h1 id="shubham-hitw-heading" className="gemini-code-title">
                Sai Shubham Anmula
              </h1>
              <div className="gemini-code-role">CO-FOUNDER</div>
            </div>

            <div className="gemini-code-description">
              <p>
                I&apos;ve always been drawn towards ideas, stories, and creating things that feel
                different. What started as curiosity slowly became a mindset noticing details,
                questioning ordinary design, and finding meaning in creativity.
              </p>
              <p>
                For me, it was never just about building something visually appealing, but about
                creating something honest, intentional, and memorable.
              </p>
            </div>

            <div className="gemini-code-progress-indicator" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
