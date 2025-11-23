'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, GitBranch, Calendar, BarChart3 } from 'lucide-react'
import Image from 'next/image'

export default function Solution() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Brain,
      title: 'Predictive Diagnostics',
      description: 'Real-time telemetry analysis with pattern recognition provides 48-hour advance warnings before failures occur.',
      items: ['Continuous monitoring', 'Pattern recognition', '48-hour warnings'],
      testId: 'feature-diagnostics'
    },
    {
      icon: GitBranch,
      title: 'Intelligent Triage',
      description: 'Multi-agent AI system cross-references symptoms, prioritizes issues, and recommends optimal service centers.',
      items: ['Multi-agent AI', 'Smart prioritization', 'Center matching'],
      testId: 'feature-triage'
    },
    {
      icon: Calendar,
      title: 'Autonomous Scheduling',
      description: 'Automatically books appointments, estimates costs, and optimizes routes based on your fleet operations.',
      items: ['Auto-booking', 'Cost estimation', 'Route optimization'],
      testId: 'feature-scheduling'
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Comprehensive dashboards with predictive forecasting and automated compliance tracking for complete visibility.',
      items: ['Real-time dashboards', 'Predictive analytics', 'Compliance tracking'],
      testId: 'feature-intelligence'
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-neutral-950 to-neutral-900" data-testid="solution-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white" data-testid="solution-title">
            Meet <span className="text-teal">Project Delamain</span>
          </h2>
          <p className="text-2xl font-rajdhani text-neutral-300 mb-6">
            Your AI Fleet Operations Command Center
          </p>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            Powered by <span className="text-teal-light font-semibold">IBM WatsonX Orchestrate</span>, 
            our multi-agent AI system autonomously monitors, diagnoses, and schedules maintenance 
            across your entire fleet—24/7, without human intervention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              data-testid={feature.testId}
            >
              <Card className="h-full border-2 border-transparent hover:border-teal transition-all duration-300 group bg-gradient-to-br from-neutral-900 to-neutral-800">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-all flex-shrink-0">
                      <feature.icon className="w-7 h-7 text-teal" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold font-rajdhani text-white mb-2">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-neutral-400 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative h-64 md:h-96 rounded-xl overflow-hidden border border-teal/30"
        >
          <Image
            src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf"
            alt="AI Technology"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
        </motion.div>
      </div>
    </section>
  )
}