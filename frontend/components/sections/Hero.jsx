'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TrendingUp, Activity, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / duration

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

export default function Hero() {
  const handleDemoClick = () => {
    // Trigger chatbot to open
    const chatButton = document.querySelector('[data-chatbot-trigger]')
    if (chatButton) {
      chatButton.click()
    }
  }

  const handleScrollToNext = () => {
    const nextSection = document.getElementById('problem-statement')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Background with grid pattern */}
      <div className="absolute inset-0 bg-neutral-950">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-teal/5 via-neutral-950/80 to-neutral-950"></div>
      </div>

      {/* Hero Background Image with teal tint */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
          alt="AI Technology Background"
          fill
          className="object-cover mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-teal/10"></div>
      </div>

      {/* Animated vehicle grid overlay */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal rounded-full"
            initial={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-teal text-sm md:text-base font-rajdhani font-semibold tracking-wider uppercase mb-4" data-testid="hero-tagline">
            Predictive Intelligence for Fleet Operations
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-orbitron mb-6 bg-gradient-to-r from-white via-teal to-teal-light bg-clip-text text-transparent" data-testid="hero-title">
            Project Delamain
          </h1>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-rajdhani font-semibold text-white mb-8" data-testid="hero-subtitle">
            AI-Powered Vehicle Maintenance That Never Sleeps
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto mb-12 leading-relaxed" data-testid="hero-description">
            Reduce downtime by <span className="text-teal font-bold">40%</span>. 
            Cut maintenance costs by <span className="text-teal font-bold">30%</span>. 
            Keep your fleet moving with autonomous diagnostics and intelligent scheduling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg font-semibold shadow-lg glow-hover" 
              onClick={handleDemoClick}
              data-testid="live-demo-btn"
            >
              Live Demo
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg font-semibold"
              onClick={handleScrollToNext}
              data-testid="see-how-it-works-btn"
            >
              See How It Works
            </Button>
          </div>

          {/* Animated Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-teal/30 rounded-lg p-6 glow-hover" data-testid="metric-monitoring">
              <Activity className="w-8 h-8 text-teal mx-auto mb-3" />
              <p className="text-3xl font-bold font-rajdhani text-white mb-1">24/7</p>
              <p className="text-sm text-neutral-400">Monitoring</p>
            </div>
            
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-teal/30 rounded-lg p-6 glow-hover" data-testid="metric-vehicles">
              <TrendingUp className="w-8 h-8 text-teal mx-auto mb-3" />
              <p className="text-3xl font-bold font-rajdhani text-white mb-1">
                <AnimatedCounter end={10000} suffix="+" />
              </p>
              <p className="text-sm text-neutral-400">Vehicles Tracked</p>
            </div>
            
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-teal/30 rounded-lg p-6 glow-hover" data-testid="metric-uptime">
              <Shield className="w-8 h-8 text-teal mx-auto mb-3" />
              <p className="text-3xl font-bold font-rajdhani text-white mb-1">
                <AnimatedCounter end={99.7} suffix="%" />
              </p>
              <p className="text-sm text-neutral-400">Uptime</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-teal rounded-full flex justify-center">
          <div className="w-1 h-3 bg-teal rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}