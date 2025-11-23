'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageSquare, Zap, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function DemoPage() {
  const router = useRouter()
  const [chatbotLoaded, setChatbotLoaded] = useState(false)

  useEffect(() => {
    // Initialize IBM WatsonX Orchestrate Chatbot
    if (typeof window !== 'undefined') {
      window.wxOConfiguration = {
        orchestrationID: process.env.NEXT_PUBLIC_WXO_ORCHESTRATION_ID,
        hostURL: process.env.NEXT_PUBLIC_WXO_HOST_URL,
        rootElementID: "watsonx-chatbot-root",
        deploymentPlatform: process.env.NEXT_PUBLIC_WXO_DEPLOYMENT_PLATFORM,
        crn: process.env.NEXT_PUBLIC_WXO_CRN,
        chatOptions: {
          agentId: process.env.NEXT_PUBLIC_WXO_AGENT_ID,
        }
      }

      setTimeout(() => {
        const script = document.createElement('script')
        script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`
        script.addEventListener('load', () => {
          if (window.wxoLoader) {
            window.wxoLoader.init()
            setChatbotLoaded(true)
          }
        })
        script.addEventListener('error', () => {
          console.error('Failed to load WatsonX chatbot')
        })
        document.head.appendChild(script)
      }, 0)
    }
  }, [])

  const samplePrompts = [
    "Check my vehicle status",
    "Schedule maintenance for Fleet-042",
    "What's the cost estimate for brake service?",
    "Show me upcoming appointments",
    "Analyze fleet health report",
    "Find nearest service centers",
  ]

  const capabilities = [
    "Real-time vehicle diagnostics",
    "Predictive maintenance alerts",
    "Automated service scheduling",
    "Cost estimation",
    "Service center recommendations",
    "Fleet health monitoring",
  ]

  return (
    <div className="min-h-screen bg-navy-deep flex flex-col" data-testid="demo-page">
      {/* Header */}
      <header className="bg-navy-slate border-b border-navy-steel py-4 px-4 md:px-8" data-testid="demo-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              data-testid="back-home-btn"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-orbitron text-white">
                Project Delamain <span className="text-blue-electric">Demo</span>
              </h1>
              <p className="text-sm text-gray-400 hidden md:block">AI Fleet Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm text-green-500">Live</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-80 bg-navy-slate border-r border-navy-steel p-6 overflow-y-auto" data-testid="demo-sidebar">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-electric/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-electric" />
            </div>
            <h2 className="text-xl font-bold font-rajdhani text-white mb-2">
              AI Fleet Assistant
            </h2>
            <p className="text-sm text-gray-400">
              Powered by IBM WatsonX
            </p>
          </div>

          {/* Sample Prompts */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Try These Prompts
            </h3>
            <div className="space-y-2">
              {samplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 bg-navy-deep hover:bg-navy-steel rounded-lg text-sm text-gray-300 transition-colors border border-transparent hover:border-blue-electric"
                  data-testid={`sample-prompt-${index}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* System Capabilities */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              System Capabilities
            </h3>
            <ul className="space-y-2">
              {capabilities.map((capability, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-300 flex items-start"
                  data-testid={`capability-${index}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-electric mt-2 mr-2 flex-shrink-0"></span>
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          {/* Demo Limitations */}
          <div className="bg-navy-deep border border-yellow-500/30 rounded-lg p-4" data-testid="sidebar-limitations">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-yellow-500 mb-1">Demo Limitations</p>
                <p className="text-xs text-gray-400">
                  Using sample data. Bookings are simulated.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-navy-deep" data-testid="chat-area">
          {/* Chatbot Container */}
          <div className="flex-1 relative" id="watsonx-chatbot-root" data-testid="chatbot-container">
            {/* Loading State */}
            {!chatbotLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-blue-electric border-t-transparent animate-spin"></div>
                  <p className="text-gray-400">Loading AI Assistant...</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Sample Prompts */}
          <div className="md:hidden bg-navy-slate border-t border-navy-steel p-4">
            <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {samplePrompts.slice(0, 3).map((prompt, index) => (
                <button
                  key={index}
                  className="px-3 py-2 bg-navy-deep rounded-lg text-xs text-gray-300 whitespace-nowrap border border-blue-electric/30"
                  data-testid={`mobile-prompt-${index}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}