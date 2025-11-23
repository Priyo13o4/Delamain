'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/sections/Hero'
import ProblemStatement from '@/components/sections/ProblemStatement'
import Solution from '@/components/sections/Solution'
import HowItWorks from '@/components/sections/HowItWorks'
import BusinessValue from '@/components/sections/BusinessValue'
import WhoBenefits from '@/components/sections/WhoBenefits'
import TechStack from '@/components/sections/TechStack'
import LiveDemo from '@/components/sections/LiveDemo'
import CTA from '@/components/sections/CTA'
import ChatbotWidget from '@/components/ChatbotWidget'

export default function Home() {
  return (
    <main className="min-h-screen" data-testid="landing-page">
      <Hero />
      <ProblemStatement />
      <Solution />
      <HowItWorks />
      <BusinessValue />
      <WhoBenefits />
      <TechStack />
      <LiveDemo />
      <CTA />
      
      {/* Chatbot Widget */}
      <ChatbotWidget />
      
      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-8" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-400">
          <p className="text-sm">
            &copy; 2025 Project Delamain. AI-Powered Vehicle Predictive Maintenance Platform.
          </p>
          <p className="text-xs mt-2">
            Powered by IBM WatsonX Orchestrate
          </p>
        </div>
      </footer>
    </main>
  )
}