import './PrinceHowItWorksSection.css'

const ASSET_TOP_RIGHT = '/Prince-2.png'
const ASSET_SUBJECT = '/Prince.png'

export default function PrinceHowItWorksSection() {
  return (
    <section
      className="prince-hitw-section"
      aria-labelledby="prince-hitw-heading"
    >
      <div className="gemini4580747-root">
        <div className="gemini4580747-viewport hitw-viewport-inner">
          <img
            src={ASSET_TOP_RIGHT}
            className="gemini4580747-asset-top-right"
            alt=""
            width={620}
            height={620}
            decoding="async"
          />

          <img
            src={ASSET_SUBJECT}
            className="gemini4580747-asset-subject"
            alt="Prince Mehindpra — Co-founder"
            width={900}
            height={1200}
            decoding="async"
          />

          <div className="gemini4580747-content-card">
            <div className="gemini4580747-header">
              <h1 id="prince-hitw-heading" className="gemini4580747-title">
                Prince Mendpra
              </h1>
              <div className="gemini4580747-role">CO-FOUNDER</div>
            </div>

            <div className="gemini4580747-description">
              <p>
                I&apos;ve always believed that the smallest details shape the biggest experiences.
                While ideas start the journey, structure, discipline, and execution are what give
                them life.
              </p>
              <p>
                I&apos;m drawn towards building things that feel refined, balanced, and purposeful
                where creativity is supported by clarity and precision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
