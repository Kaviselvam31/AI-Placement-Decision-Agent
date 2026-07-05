import { About } from '../components/landing/About';
import { Benefits } from '../components/landing/Benefits';
import { CTA } from '../components/landing/CTA';
import { FAQ } from '../components/landing/FAQ';
import { Features } from '../components/landing/Features';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';

export function LandingPage() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Benefits />
      <FAQ />
      <CTA />
    </main>
  );
}
