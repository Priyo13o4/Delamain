'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { MessageSquare, Zap, AlertCircle } from 'lucide-react'

export default function LiveDemo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleLaunchChat = () => {
    // Trigger chatbot to open
    const chatButton = document.querySelector('[data-chatbot-trigger]')
    if (chatButton) {
      chatButton.click()
    }
  }

  const examplePrompts = [
    '"Check my fleet health"',
    '"Schedule a maintenance appointment"',
    '"Get cost estimate for brake service"',
  ]

  return (
    <section className="relative py-20 bg-neutral-900" data-testid="live-demo-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white" data-testid="live-demo-title">
            Experience It <span className="text-teal">Yourself</span>
          </h2>
          
          <p className="text-xl font-rajdhani text-neutral-300 mb-6">
            Chat with The Conductor - Our Master AI Agent
          </p>
          
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8">
            Try our live demo to see how Project Delamain understands your fleet needs, 
            diagnoses issues, and coordinates maintenance—all through natural conversation.
          </p>

          {/* Example Prompts */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-neutral-400 mb-4">Try asking:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {examplePrompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="px-4 py-2 bg-neutral-950 border border-teal/30 rounded-full text-sm text-neutral-300 hover:border-teal hover:bg-neutral-800 cursor-pointer transition-all"
                  data-testid={`prompt-${index}`}
                >
                  {prompt}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Demo Limitations Notice */}
          <div className="bg-neutral-950 border border-yellow-500/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto" data-testid="demo-limitations">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-semibold text-yellow-500 mb-2">Demo Limitations</p>
                <p className="text-sm text-neutral-400">
                  This demo uses sample fleet data. Service bookings are simulated and won't create real appointments. 
                  For production deployment, contact our team.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button
              size="sm"
              className="px-6 py-3 font-semibold shadow-lg glow group rounded-full"
              onClick={handleLaunchChat}
              data-testid="launch-demo-btn"
            >
              <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              Launch AI Chat Demo
            </Button>
          </motion.div>


        </motion.div>
      </div>
    </section>
  )
}