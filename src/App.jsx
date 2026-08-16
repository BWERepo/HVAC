import { useCallback, useState } from 'react'

import BusinessWebExpressCTA from './components/BusinessWebExpressCTA'
import EstimateWizard from './components/EstimateWizard'
import FinancingSection from './components/FinancingSection'
import Footer, { DemoDisclaimer } from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import InteractiveThermostat from './components/InteractiveThermostat'
import LeadForm from './components/LeadForm'
import MembershipSection from './components/MembershipSection'
import MobileActionBar from './components/MobileActionBar'
import ProblemSelector from './components/ProblemSelector'
import ScheduleBottomSheet from './components/ScheduleBottomSheet'
import ServiceArea from './components/ServiceArea'
import FieldPhotos from './components/FieldPhotos'
import ServiceGrid from './components/ServiceGrid'
import ScrollJump from './components/ScrollJump'
import SocialRail from './components/SocialRail'
import TeamSection from './components/TeamSection'
import TopBar from './components/TopBar'
import Testimonials from './components/Testimonials'
import TrustStats from './components/TrustStats'

export default function App() {
  const [sheetOpen, setSheetOpen] = useState(false)

  // Every "schedule" affordance on the page routes through here, so there is
  // exactly one booking surface to maintain.
  const openSheet = useCallback(() => setSheetOpen(true), [])
  const closeSheet = useCallback(() => setSheetOpen(false), [])

  return (
    // Bottom padding clears the fixed mobile action bar.
    <div className="pb-[76px] lg:pb-0">
      <a
        href="#main"
        className="sr-only rounded-full bg-sun px-5 py-3 font-semibold text-[#2a1b04] focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
      >
        Skip to main content
      </a>

      <TopBar />
      <Header onSchedule={openSheet} />
      <SocialRail />
      <ScrollJump />

      <main id="main">
        <Hero />
        <InteractiveThermostat onSchedule={openSheet} />
        <TrustStats />
        <ProblemSelector onSchedule={openSheet} />
        <ServiceGrid />
        <FieldPhotos />
        <EstimateWizard />
        <Testimonials />
        <ServiceArea />
        <TeamSection />
        <MembershipSection onSchedule={openSheet} />
        <FinancingSection />
        <LeadForm />
      </main>

      <Footer />
      <BusinessWebExpressCTA />
      <DemoDisclaimer />

      <MobileActionBar onSchedule={openSheet} />
      <ScheduleBottomSheet open={sheetOpen} onClose={closeSheet} />
    </div>
  )
}
