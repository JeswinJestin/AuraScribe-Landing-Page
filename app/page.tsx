import { SmoothScroll } from '@/components/smooth-scroll'
import { Nav } from '@/components/nav'
import { Story } from '@/components/story'
import { PoweredBy, HowItWorks, Features } from '@/components/sections'
import { Comparison } from '@/components/comparison'
import { Faq } from '@/components/faq'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

/*
  The page alternates dark and cream chambers; ThemeScroll (in layout) blends the page colour as
  each chamber owns the viewport centre. Every section reads the same theme tokens, so wrapping a
  section in a data-theme chamber re-tints it. Story sets its own themes internally.
*/
export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Story />
        {/* One long DARK chamber from "Three keys" to the footer. The colour arrives once,
            when this block actually fills the screen, and holds. */}
        <div data-chamber="dark">
          <PoweredBy />
          <HowItWorks />
          <Features />
          <Comparison />
          <Faq />
          <Contact />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  )
}
