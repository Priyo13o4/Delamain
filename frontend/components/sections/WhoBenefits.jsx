'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Building2, Car } from 'lucide-react'

export default function WhoBenefits() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const audiences = [
    {
      icon: Users,
      title: 'Fleet Managers',
      painPoint: 'Spending 60% of time firefighting breakdowns instead of optimizing operations',
      solution: 'Automated alerts, intelligent prioritization, and hands-free coordination free up your time for strategic planning',
      testId: 'audience-fleet-managers'
    },
    {
      icon: Building2,
      title: 'Logistics Companies',
      solution: 'Off-peak scheduling and predictive maintenance maximize vehicle utilization and protect delivery commitments',
      painPoint: 'Every hour of downtime costs $500+ in missed deliveries and customer penalties',
      testId: 'audience-logistics'
    },
    {
      icon: Car,
      title: 'Vehicle Owners (B2B2C)',
      painPoint: 'Surprise $3,000 repair bills with no warning or cost transparency',
      solution: 'Advance warnings, upfront cost estimates, and convenient scheduling put you back in control',
      testId: 'audience-vehicle-owners'
    },
  ]

  return (
    <section className="relative py-20 bg-neutral-950" data-testid="who-benefits-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white" data-testid="who-benefits-title">
            Built for Modern <span className="text-teal">Fleet Operations</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              data-testid={audience.testId}
            >
              <Card className="h-full group hover:border-teal transition-all duration-300 bg-gradient-to-br from-neutral-900 to-neutral-800 perspective-1000">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 group-hover:scale-110 transition-all">
                    <audience.icon className="w-8 h-8 text-teal" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-rajdhani text-center mb-6 text-white">
                    {audience.title}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-red-400 mb-2">Pain Point:</p>
                      <p className="text-neutral-400 leading-relaxed">
                        {audience.painPoint}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-green-400 mb-2">Solution:</p>
                      <p className="text-neutral-300 leading-relaxed">
                        {audience.solution}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}