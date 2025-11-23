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
    '"Check my vehicle status"',
    '"Schedule maintenance for Fleet-042"',
    '"What\'s the cost estimate for brake service?"',
    '"Show me upcoming appointments"',
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/10 mb-6 glow">
            <MessageSquare className="w-10 h-10 text-teal" />
          </div>
          
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
              size="lg"
              className="text-xl px-12 py-6 font-bold shadow-2xl glow group"
              onClick={handleLaunchChat}
              data-testid="launch-demo-btn"
            >
              <Zap className="w-6 h-6 mr-2 group-hover:animate-pulse" />
              Launch AI Chat Demo
            </Button>
          </motion.div>

          {/* Floating Chat Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 relative"
          >
            <div className="bg-neutral-950 border border-teal/30 rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">The Conductor</p>
                  <p className="text-xs text-neutral-400">AI Fleet Assistant</p>
                </div>
                <div className="ml-auto flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs text-green-500">Online</span>
                </div>
              </div>
              <div className="bg-neutral-900 rounded-lg p-3 text-left">
                <p className="text-sm text-neutral-300">
                  Hello! I'm The Conductor, your AI fleet assistant. How can I help you today?
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-neutral-500 text-xs">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
                <span>Typing...</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}