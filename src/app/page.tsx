import { CallToAction } from "@/sections/CallToAction"
import { Features } from "@/sections/Features"
import { Footer } from "@/sections/Footer"
import { Header } from "@/sections/Header"
import { Hero } from "@/sections/Hero"
import { Innovation } from "@/sections/Innovation"
import { LogoTicker } from "@/sections/LogoTicker"
import { Solution } from "@/sections/Solution"
import { Testimonials } from "@/sections/Testimonials"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LogoTicker />
      <Innovation />
      <Solution />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  )
}
