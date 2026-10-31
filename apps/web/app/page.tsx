import { CapabilitiesSection } from "@/components/home/capabilities-section"
import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { PreviewSection } from "@/components/home/preview-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />
      <PreviewSection />
      <HowItWorksSection />
    </>
  )
}
