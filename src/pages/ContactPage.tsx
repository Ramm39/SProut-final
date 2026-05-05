import Navbar from '../components/navbar'
import SiteFooter from '../components/SiteFooter'
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
      <SiteFooter />
    </>
  )
}
