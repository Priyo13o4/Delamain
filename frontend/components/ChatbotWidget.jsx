'use client'

import { useEffect, useState, useRef } from 'react'
import { MessageSquare, X, Zap, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [chatbotLoaded, setChatbotLoaded] = useState(false)
  const [copiedPrompt, setCopiedPrompt] = useState(null)
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

  // Prevent background scroll when chatbot is open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isMinimized])

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
    "Check my fleet health",
    "Schedule a maintenance appointment",
    "Get cost estimate for brake service",
  ]

  const handlePromptClick = async (prompt) => {
    // Copy prompt to clipboard since IBM Watson doesn't expose API for programmatic messaging
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedPrompt(prompt)
      setTimeout(() => setCopiedPrompt(null), 2000)
    } catch (err) {
      console.error('Failed to copy prompt:', err)
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
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Minimized Chat Button */}
      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-teal hover:bg-teal-dark rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          aria-label="Expand chat"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window Popup - Half Screen */}
      {isOpen && (
        <div className={`fixed top-4 right-4 bottom-4 w-[50vw] max-w-[800px] min-w-[600px] bg-neutral-900 rounded-2xl shadow-2xl flex overflow-hidden z-50 border border-teal/30 transition-opacity duration-300 ${isMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
                    className="w-full text-left px-3 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-xs text-neutral-300 transition-colors border border-transparent hover:border-teal/30 cursor-pointer relative"
                  >
                    {prompt}
                    {copiedPrompt === prompt && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-teal font-semibold">
                        Copied!
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-neutral-500 mt-2">
                Click to copy, then paste in chat
              </p>
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
            {/* Header with Close and Minimize Buttons */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <h3 className="text-white font-semibold">Chat with AI Assistant</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-8 h-8 rounded-full hover:bg-neutral-800 flex items-center justify-center transition-colors"
                  aria-label="Minimize chat"
                >
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-neutral-800 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
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
                    <p className="text-neutral-400 text-sm">Loading The Orchestrator...</p>
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
