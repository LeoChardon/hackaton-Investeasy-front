import { createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/landingpage/Navbar'
import Header from '@/components/landingpage/Header'
import TrustBar from '@/components/landingpage/TrustBar'
import PainSolution from '@/components/landingpage/PainSolution'
import Features from '@/components/landingpage/Features'
import About from '@/components/landingpage/About'
import HowItWorks from '@/components/landingpage/HowItWorks'
import SocialProof from '@/components/landingpage/SocialProof'
import Pricing from '@/components/landingpage/Pricing'
import FAQ from '@/components/landingpage/FAQ'
import CTABand from '@/components/landingpage/CTABand'
import Footer from '@/components/landingpage/Footer'
import HeroBackdrop from '@/components/landingpage/HeroBackdrop'

export const Route = createFileRoute('/')({
  component: Landing,
})

function Landing() {
  const title = 'Inve$t€asy'
  // const tagline = 'Identify competitors, score feasibility, and validate market fit.'
  const tagline = ''
  const subtitle =
    'Investeasy enables investors and founders to immediately determine whether a startup idea is bankable and has real market potential.'

  return (
<div className="relative isolate min-h-screen bg-[var(--surface)]">
      <HeroBackdrop />
        <Navbar />
        <Header title={title} subtitle={subtitle} tagline={tagline} />
        <CTABand />
        <TrustBar />
        <PainSolution />
        <Features />
        <About />
        <HowItWorks />
        <FAQ />
        <Footer />
    </div>
  )
}

export default Landing
