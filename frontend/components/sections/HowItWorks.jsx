'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cpu, GitBranch, Radio, Brain, Wrench } from 'lucide-react'

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-neutral-900 border-y border-neutral-800" data-testid="how-it-works-section">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-orbitron text-white">The Architecture Behind the <span className="text-teal">Intelligence</span></h2>
          <p className="text-neutral-400">Built for Scale, Designed for Reliability</p>
        </motion.div>

        {/* SVG Diagram Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-5xl mx-auto bg-neutral-950 p-4 sm:p-12 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal to-transparent opacity-50"></div>
          
          <svg viewBox="0 0 600 450" className="w-full h-auto">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#262626" stopOpacity="0.2"/>
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#262626" stopOpacity="0.2"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Connections */}
            <g stroke="url(#lineGrad)" strokeWidth="2" fill="none">
              {/* Fleet to n8n */}
              <path d="M300 370 L 300 330" />
              
              {/* n8n to Agents */}
              <path d="M300 270 L 140 210" />
              <path d="M300 270 L 460 210" />
              
              {/* Agents to Conductor */}
              <path d="M140 150 L 255 90" />
              <path d="M460 150 L 345 90" />
            </g>

            {/* Conductor Node (Top Center) */}
            <g>
              <circle cx="300" cy="60" r="55" fill="#0a0a0a" stroke="#14b8a6" strokeWidth="3" filter="url(#glow)" />
              <circle cx="300" cy="60" r="45" fill="none" stroke="#14b8a6" strokeWidth="1" strokeDasharray="5,5" opacity="0.5">
                <animateTransform attributeName="transform" type="rotate" from="0 300 60" to="360 300 60" dur="10s" repeatCount="indefinite" />
              </circle>
              <foreignObject x="284" y="35" width="32" height="32">
                <div className="flex items-center justify-center h-full w-full">
                  <Cpu className="text-teal w-8 h-8" />
                </div>
              </foreignObject>
              <text x="300" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CONDUCTOR</text>
            </g>

            {/* Agents Layer (Middle) */}
            {/* Diagnostician Node (Left) */}
            <g>
              <rect x="80" y="150" width="120" height="60" rx="8" fill="#171717" stroke="#2dd4bf" strokeWidth="2" />
              <foreignObject x="128" y="160" width="24" height="24">
                <div className="flex items-center justify-center h-full w-full">
                  <Brain className="text-teal-light w-6 h-6" />
                </div>
              </foreignObject>
              <text x="140" y="200" textAnchor="middle" fill="white" fontSize="10">Diagnostician</text>
            </g>

            {/* Service Manager Node (Right) */}
            <g>
              <rect x="400" y="150" width="120" height="60" rx="8" fill="#171717" stroke="#2dd4bf" strokeWidth="2" />
              <foreignObject x="448" y="160" width="24" height="24">
                <div className="flex items-center justify-center h-full w-full">
                  <Wrench className="text-teal-light w-6 h-6" />
                </div>
              </foreignObject>
              <text x="460" y="200" textAnchor="middle" fill="white" fontSize="10">Service Manager</text>
            </g>

            {/* n8n Node (Below Agents) */}
            <g>
              <rect x="250" y="270" width="100" height="60" rx="8" fill="#171717" stroke="#525252" strokeWidth="1" />
              <foreignObject x="288" y="280" width="24" height="24">
                <div className="flex items-center justify-center h-full w-full">
                  <GitBranch className="text-neutral-400 w-6 h-6" />
                </div>
              </foreignObject>
              <text x="300" y="320" textAnchor="middle" fill="white" fontSize="10">n8n Orch</text>
            </g>

            {/* Fleet Node (Bottom) */}
            <g className="cursor-pointer">
              <rect x="260" y="370" width="80" height="60" rx="8" fill="#171717" stroke="#14b8a6" strokeWidth="2" filter="url(#glow)" />
              <foreignObject x="288" y="380" width="24" height="24">
                <div className="flex items-center justify-center h-full w-full">
                  <Radio className="text-teal w-6 h-6" />
                </div>
              </foreignObject>
              <text x="300" y="420" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Fleet</text>
            </g>

            {/* Animated Data Packets */}
            {/* Fleet to n8n */}
            <circle r="4" fill="#14b8a6">
              <animateMotion dur="2s" repeatCount="indefinite" path="M300 370 L 300 330" />
            </circle>
            
            {/* n8n to Agents */}
            <circle r="4" fill="#14b8a6">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M300 270 L 140 210" />
            </circle>
            <circle r="4" fill="#14b8a6">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M300 270 L 460 210" />
            </circle>
            
            {/* Agents to Conductor */}
             <circle r="4" fill="#2dd4bf">
              <animateMotion dur="1.5s" repeatCount="indefinite" begin="1s" path="M140 150 L 255 90" />
            </circle>
             <circle r="4" fill="#2dd4bf">
              <animateMotion dur="1.5s" repeatCount="indefinite" begin="1.2s" path="M460 150 L 345 90" />
            </circle>
          </svg>

          {/* Stats Overlay */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-neutral-800">
             <div>
               <div className="text-3xl font-bold text-white font-orbitron">3</div>
               <div className="text-xs text-neutral-400 uppercase tracking-wide">Specialized Agents</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-white font-orbitron">6</div>
               <div className="text-xs text-neutral-400 uppercase tracking-wide">Data Endpoints</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-white font-orbitron">&lt;5s</div>
               <div className="text-xs text-neutral-400 uppercase tracking-wide">Response Time</div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}