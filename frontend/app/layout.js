import { Inter, Outfit, Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const rajdhani = Rajdhani({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata = {
  title: 'Project Delamain | AI-Powered Vehicle Predictive Maintenance',
  description: 'Reduce downtime by 40%. Cut maintenance costs by 30%. Keep your fleet moving with autonomous diagnostics and intelligent scheduling.',
  keywords: 'fleet management, predictive maintenance, AI, vehicle diagnostics, fleet operations, IBM WatsonX, autonomous scheduling',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} ${orbitron.variable} ${rajdhani.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  )
}