'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from '@/components/ui/card'
import { TruckIcon, Wrench, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'

const AnimatedStat = ({ value, inView }) => {
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (inView) {
      setDisplayValue(value)
    }
  }, [inView, value])

  return <span className="text-teal font-bold text-3xl">{displayValue}</span>
}

export default function ProblemStatement() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const problems = [
    {
      icon: TruckIcon,
      title: 'Unplanned Downtime',
      stat: '35%',
      description: 'of fleet vehicles experience unexpected breakdowns, costing thousands in lost revenue and emergency repairs.',
      testId: 'problem-downtime'
    },
    {
      icon: Wrench,
      title: 'Reactive Maintenance',
      stat: '$8,000',
      description: 'average cost per preventable failure. Traditional maintenance catches problems too late.',
      testId: 'problem-reactive'
    },
    {
      icon: Calendar,
      title: 'Coordination Chaos',
      stat: '18 hours',
      description: 'wasted per week on manual scheduling, phone calls, and service center coordination.',
      testId: 'problem-coordination'
    },
  ]

  return (
    <section id="problem-statement" className="relative py-20 bg-neutral-950" data-testid="problem-statement-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white" data-testid="problem-title">
            The <span className="text-teal">$50 Billion</span> Problem
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Fleet operators face mounting costs from reactive maintenance and inefficient operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              data-testid={problem.testId}
            >
              <Card className="h-full glow-hover hover:border-teal transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-all">
                    <problem.icon className="w-8 h-8 text-teal" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-rajdhani mb-4 text-white">
                    {problem.title}
                  </h3>
                  
                  <div className="mb-4">
                    <AnimatedStat value={problem.stat} inView={inView} />
                  </div>
                  
                  <p className="text-neutral-400 leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}