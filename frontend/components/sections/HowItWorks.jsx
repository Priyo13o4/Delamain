'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Cpu, GitBranch, Radio } from 'lucide-react'

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative py-20 bg-neutral-900" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white" data-testid="how-it-works-title">
            The Architecture Behind the <span className="text-teal">Intelligence</span>
          </h2>
          <p className="text-xl text-neutral-400">
            Built for Scale, Designed for Reliability
          </p>
        </motion.div>

        {/* System Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mb-16"
        >
          <div className="bg-neutral-950 border border-teal/30 rounded-xl p-8 md:p-12">
            {/* Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Vehicle Fleet */}
              <div className="flex-1 text-center" data-testid="diagram-vehicle-fleet">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-teal/10 border-2 border-teal flex items-center justify-center">
                  <Radio className="w-10 h-10 text-teal animate-pulse" />
                </div>
                <h3 className="text-lg font-bold font-rajdhani text-white mb-2">Vehicle Fleet</h3>
                <p className="text-sm text-gray-400">Real-time telemetry</p>
              </div>

              <ArrowRight className="text-teal w-8 h-8 hidden md:block" />
              <div className="md:hidden">
                <div className="w-px h-8 bg-teal"></div>
              </div>

              {/* n8n Orchestration */}
              <div className="flex-1 text-center" data-testid="diagram-orchestration">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-teal-light/10 border-2 border-teal-light flex items-center justify-center">
                  <GitBranch className="w-10 h-10 text-teal-light" />
                </div>
                <h3 className="text-lg font-bold font-rajdhani text-white mb-2">n8n Orchestration</h3>
                <p className="text-sm text-gray-400">Data routing layer</p>
              </div>

              <ArrowRight className="text-teal w-8 h-8 hidden md:block" />
              <div className="md:hidden">
                <div className="w-px h-8 bg-teal"></div>
              </div>

              {/* The Conductor */}
              <div className="flex-1 text-center" data-testid="diagram-conductor">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-teal/20 border-2 border-teal flex items-center justify-center glow">
                  <Cpu className="w-10 h-10 text-teal" />
                </div>
                <h3 className="text-lg font-bold font-rajdhani text-white mb-2">The Conductor</h3>
                <p className="text-sm text-gray-400">Master AI Agent</p>
              </div>

              <ArrowRight className="text-teal w-8 h-8 hidden md:block" />
              <div className="md:hidden">
                <div className="w-px h-8 bg-teal"></div>
              </div>

              {/* AI Agents */}
              <div className="flex-1 text-center" data-testid="diagram-agents">
                <div className="space-y-2 mb-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-neutral-900 border border-teal-light flex items-center justify-center">
                    <Brain className="w-8 h-8 text-teal-light" />
                  </div>
                  <div className="w-16 h-16 mx-auto rounded-lg bg-neutral-900 border border-teal-light flex items-center justify-center">
                    <Wrench className="w-8 h-8 text-teal-light" />
                  </div>
                </div>
                <h3 className="text-lg font-bold font-rajdhani text-white mb-2">Specialist Agents</h3>
                <p className="text-sm text-gray-400">Diagnostician & Service Manager</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-neutral-950 border border-teal/20 rounded-lg p-6" data-testid="stat-agents">
            <p className="text-4xl font-bold font-rajdhani text-teal mb-2">3</p>
            <p className="text-neutral-400">Specialized AI Agents</p>
          </div>
          
          <div className="bg-neutral-950 border border-teal/20 rounded-lg p-6" data-testid="stat-endpoints">
            <p className="text-4xl font-bold font-rajdhani text-teal mb-2">6</p>
            <p className="text-neutral-400">Data Endpoints</p>
          </div>
          
          <div className="bg-neutral-950 border border-teal/20 rounded-lg p-6" data-testid="stat-response">
            <p className="text-4xl font-bold font-rajdhani text-teal mb-2">&lt;5s</p>
            <p className="text-neutral-400">Response Time</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { Brain, Wrench } from 'lucide-react'