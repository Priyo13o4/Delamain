'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from '@/components/ui/card'
import { Cpu, GitBranch, Database, Zap, Radio } from 'lucide-react'

export default function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const technologies = [
    {
      icon: Cpu,
      name: 'IBM WatsonX Orchestrate',
      description: 'Enterprise AI platform powering our multi-agent system',
    },
    {
      icon: GitBranch,
      name: 'n8n',
      description: 'Workflow automation for seamless data orchestration',
    },
    {
      icon: Database,
      name: 'Google Sheets API',
      description: 'Flexible data management and real-time updates',
    },
    {
      icon: Zap,
      name: 'OpenAPI 3.0',
      description: 'Standards-compliant integration architecture',
    },
    {
      icon: Radio,
      name: 'Real-Time Telemetry',
      description: 'Continuous vehicle health monitoring',
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-neutral-950 to-neutral-900" data-testid="tech-stack-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white" data-testid="tech-stack-title">
            Enterprise-Grade <span className="text-teal">Technology</span>
          </h2>
          <p className="text-xl text-neutral-400">
            Proven Tools, Innovative Integration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              data-testid={`tech-${index}`}
            >
              <Card className="h-full text-center hover:border-teal transition-all duration-300 group bg-neutral-900">
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-all">
                    <tech.icon className="w-7 h-7 text-teal" />
                  </div>
                  <h3 className="text-sm font-bold font-rajdhani text-white mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {tech.description}
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