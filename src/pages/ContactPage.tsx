import Navbar from '../components/navbar'
import SiteFooterGate from '../components/SiteFooterGate'
import FullPageScroll from '../components/FullPageScroll'
import { ContactHeroSlide, ContactFormSlide } from '../components/GetInTouchSections'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        <FullPageScroll>
          <ContactHeroSlide headingLevel={1} />
          <ContactFormSlide />
        </FullPageScroll>
      </main>
      <SiteFooterGate />
    </>
  )
}
