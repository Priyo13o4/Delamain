'use client'

import { useEffect, useState, useRef } from 'react'
import { MessageSquare, X, Zap, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatbotLoaded, setChatbotLoaded] = useState(false)
  const chatInstanceRef = useRef(null)

  useEffect(() => {
    // Initialize IBM WatsonX Orchestrate Chatbot on component mount
    if (typeof window !== 'undefined' && !window.wxOConfigurationSet) {
      window.wxOConfiguration = {
        orchestrationID: process.env.NEXT_PUBLIC_WXO_ORCHESTRATION_ID,
        hostURL: process.env.NEXT_PUBLIC_WXO_HOST_URL,
        deploymentPlatform: process.env.NEXT_PUBLIC_WXO_DEPLOYMENT_PLATFORM,
        crn: process.env.NEXT_PUBLIC_WXO_CRN,
        chatOptions: {
          agentId: process.env.NEXT_PUBLIC_WXO_AGENT_ID,
          agentEnvironmentId: process.env.NEXT_PUBLIC_WXO_AGENT_ENVIRONMENT_ID,
        },
        layout: {
          form: 'custom',
          showOrchestrateHeader: false,
          customElement: null // Will be set when popup opens
        }
      }
      window.wxOConfigurationSet = true

      const script = document.createElement('script')
      script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`
      script.addEventListener('load', () => {
        if (window.wxoLoader) {
          setChatbotLoaded(true)
        }
      })
      script.addEventListener('error', () => {
        console.error('Failed to load WatsonX chatbot')
      })
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    // Initialize chat when opened
    if (isOpen && chatbotLoaded && !chatInstanceRef.current) {
      const chatContainer = document.getElementById('watsonx-chatbot-container')
      if (chatContainer && window.wxoLoader) {
        window.wxOConfiguration.layout.customElement = chatContainer
        chatInstanceRef.current = window.wxoLoader.init()
      }
    }
  }, [isOpen, chatbotLoaded])

  const samplePrompts = [
    "Check my vehicle status",
    "Schedule maintenance for Fleet-042",
    "What's the cost estimate for brake service?",
    "Show me upcoming appointments",
    "Analyze fleet health report",
    "Find nearest service centers",
  ]

  const handlePromptClick = (prompt) => {
    // Send the prompt to the chatbot by programmatically filling the input
    const chatInput = document.querySelector('#watsonx-chatbot-container input[type="text"], #watsonx-chatbot-container textarea')
    if (chatInput) {
      chatInput.value = prompt
      chatInput.dispatchEvent(new Event('input', { bubbles: true }))
      // Trigger form submission if there's a submit button
      setTimeout(() => {
        const submitBtn = document.querySelector('#watsonx-chatbot-container button[type="submit"]')
        if (submitBtn) {
          submitBtn.click()
        }
      }, 100)
    }
  }

  const capabilities = [
    "Real-time vehicle diagnostics",
    "Predictive maintenance alerts",
    "Automated service scheduling",
    "Cost estimation",
    "Service center recommendations",
    "Fleet health monitoring",
  ]

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          data-chatbot-trigger
          className="fixed bottom-6 right-6 w-16 h-16 bg-teal hover:bg-teal-dark rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessageSquare className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window Popup - Half Screen */}
      {isOpen && (
        <div className="fixed top-4 right-4 bottom-4 w-[50vw] max-w-[800px] min-w-[600px] bg-neutral-900 rounded-2xl shadow-2xl flex overflow-hidden z-50 border border-teal/30">
          {/* Sidebar */}
          <aside className="w-80 bg-neutral-950 border-r border-neutral-800 p-6 overflow-y-auto">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold font-rajdhani text-white mb-2">
                Project Delamain
              </h2>
              <p className="text-sm text-neutral-400">
                AI Fleet Assistant powered by IBM WatsonX
              </p>
            </div>

            {/* Sample Prompts */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-neutral-400 mb-3 flex items-center">
                <Zap className="w-3 h-3 mr-2" />
                Try These Prompts
              </h3>
              <div className="space-y-2">
                {samplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="w-full text-left px-3 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-xs text-neutral-300 transition-colors border border-transparent hover:border-teal/30 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* System Capabilities */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-neutral-400 mb-3 flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-2" />
                System Capabilities
              </h3>
              <ul className="space-y-2">
                {capabilities.map((capability, index) => (
                  <li
                    key={index}
                    className="text-xs text-neutral-300 flex items-start"
                  >
                    <span className="w-1 h-1 rounded-full bg-teal mt-1.5 mr-2 flex-shrink-0"></span>
                    {capability}
                  </li>
                ))}
              </ul>
            </div>

            {/* Demo Limitations */}
            <div className="bg-neutral-900 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-yellow-500 mb-1">Demo Limitations</p>
                  <p className="text-xs text-neutral-400">
                    Using sample data. Bookings are simulated.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Chat Area */}
          <main className="flex-1 flex flex-col bg-neutral-900 relative">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <h3 className="text-white font-semibold">Chat with AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-neutral-800 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Chatbot Container */}
            <div 
              className="flex-1 w-full overflow-hidden" 
              id="watsonx-chatbot-container"
              style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}
            >
              {/* Loading State */}
              {!chatbotLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-teal border-t-transparent animate-spin"></div>
                    <p className="text-neutral-400 text-sm">Loading AI Assistant...</p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  )
}
