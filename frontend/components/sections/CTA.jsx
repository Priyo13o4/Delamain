'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Rocket, FileText, Send } from 'lucide-react'
import { useState } from 'react'

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    fleetSize: '',
    email: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just show success message
    // In production, this would send to backend API
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-neutral-900 to-neutral-950" data-testid="cta-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white" data-testid="cta-title">
            Ready to Transform Your <span className="text-teal">Fleet Operations</span>?
          </h2>
        </motion.div>

        {/* Two-Path CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-gradient-to-br from-teal/10 to-neutral-900 border-teal/50 hover:border-teal transition-all group" data-testid="cta-business">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-teal" />
                </div>
                <h3 className="text-2xl font-bold font-rajdhani mb-3 text-white">
                  For Businesses
                </h3>
                <p className="text-neutral-400 mb-6">
                  Start a pilot program with your fleet and see results in 30 days
                </p>
                <Button size="lg" className="w-full" data-testid="schedule-pilot-btn">
                  Schedule a Pilot Program
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-gradient-to-br from-teal-light/10 to-neutral-900 border-teal-light/50 hover:border-teal-light transition-all group" data-testid="cta-investors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-light/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-teal-light" />
                </div>
                <h3 className="text-2xl font-bold font-rajdhani mb-3 text-white">
                  For Investors/Partners
                </h3>
                <p className="text-neutral-400 mb-6">
                  Explore market opportunity and technical architecture
                </p>
                <Button size="lg" variant="secondary" className="w-full" data-testid="view-pitch-btn" onClick={() => window.open('https://gamma.app/docs/Project-Delamain-srkabbek92hs0kh', '_blank')}>
                  View Full Pitch Deck
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="max-w-3xl mx-auto border-teal/30 bg-neutral-900" data-testid="contact-form">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold font-rajdhani text-center mb-6 text-white">
                Get in Touch
              </h3>
              
              {submitted ? (
                <div className="text-center py-8" data-testid="form-success">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xl font-semibold text-green-500 mb-2">Thank you!</p>
                  <p className="text-neutral-400">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2" data-testid="name-label">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        data-testid="name-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2" data-testid="company-label">
                        Company *
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Acme Logistics"
                        data-testid="company-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2" data-testid="fleet-label">
                        Fleet Size
                      </label>
                      <Input
                        name="fleetSize"
                        value={formData.fleetSize}
                        onChange={handleChange}
                        placeholder="50"
                        data-testid="fleet-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2" data-testid="email-label">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@acme.com"
                        data-testid="email-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2" data-testid="message-label">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your fleet operations..."
                      rows={4}
                      data-testid="message-input"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" data-testid="submit-btn">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}