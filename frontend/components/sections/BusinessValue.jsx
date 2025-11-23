'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { useState } from 'react'

export default function BusinessValue() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [fleetSize, setFleetSize] = useState(50)
  const [vehicleValue, setVehicleValue] = useState(50000)

  // ROI Calculations
  const calculateROI = () => {
    const annualMaintenance = fleetSize * 3000 // $3k per vehicle baseline
    const savings = annualMaintenance * 0.3 // 30% cost reduction
    const downtimeReduction = fleetSize * 5000 * 0.4 // 40% downtime reduction value
    const totalSavings = savings + downtimeReduction
    const roiMonths = Math.ceil((fleetSize * 200) / (totalSavings / 12)) // $200 per vehicle setup
    
    return {
      savings: totalSavings.toLocaleString(),
      downtimeReduction: '40%',
      roiMonths
    }
  }

  const roi = calculateROI()

  const comparison = [
    {
      metric: 'Failure Prediction',
      traditional: '0-24 hours',
      delamain: '48+ hours',
      traditionalIcon: X,
      delamainIcon: Check,
    },
    {
      metric: 'Response Speed',
      traditional: 'Manual (hours)',
      delamain: 'Autonomous (<5s)',
      traditionalIcon: X,
      delamainIcon: Check,
    },
    {
      metric: 'Service Booking',
      traditional: 'Phone calls',
      delamain: 'Auto-scheduled',
      traditionalIcon: X,
      delamainIcon: Check,
    },
    {
      metric: 'Cost Visibility',
      traditional: 'After service',
      delamain: 'Upfront estimates',
      traditionalIcon: X,
      delamainIcon: Check,
    },
    {
      metric: 'Monitoring',
      traditional: 'Periodic checks',
      delamain: '24/7 real-time',
      traditionalIcon: X,
      delamainIcon: Check,
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-neutral-900 to-neutral-950" data-testid="business-value-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-white" data-testid="business-value-title">
            Why This Matters for Your <span className="text-teal">Bottom Line</span>
          </h2>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="border-teal/30 bg-gradient-to-br from-neutral-900 to-neutral-800" data-testid="roi-calculator">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold font-rajdhani text-white mb-6 text-center">
                Calculate Your ROI
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2" data-testid="fleet-size-label">
                    Fleet Size
                  </label>
                  <Input
                    type="number"
                    value={fleetSize}
                    onChange={(e) => setFleetSize(parseInt(e.target.value) || 0)}
                    min="1"
                    data-testid="fleet-size-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2" data-testid="vehicle-value-label">
                    Average Vehicle Value ($)
                  </label>
                  <Input
                    type="number"
                    value={vehicleValue}
                    onChange={(e) => setVehicleValue(parseInt(e.target.value) || 0)}
                    min="0"
                    data-testid="vehicle-value-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-950 rounded-lg p-6">
                <div className="text-center" data-testid="roi-annual-savings">
                  <p className="text-sm text-neutral-400 mb-2">Annual Savings</p>
                  <p className="text-3xl font-bold font-rajdhani text-teal">${roi.savings}</p>
                </div>
                
                <div className="text-center" data-testid="roi-downtime-reduction">
                  <p className="text-sm text-neutral-400 mb-2">Downtime Reduction</p>
                  <p className="text-3xl font-bold font-rajdhani text-teal">{roi.downtimeReduction}</p>
                </div>
                
                <div className="text-center" data-testid="roi-payback">
                  <p className="text-sm text-neutral-400 mb-2">ROI Timeline</p>
                  <p className="text-3xl font-bold font-rajdhani text-teal">{roi.roiMonths} months</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-teal/30 bg-neutral-900" data-testid="comparison-table">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="text-left p-6 text-neutral-400 font-medium">Metric</th>
                      <th className="text-center p-6 text-neutral-400 font-medium">Traditional Maintenance</th>
                      <th className="text-center p-6 text-teal font-medium">Project Delamain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/30 transition-colors"
                        data-testid={`comparison-row-${index}`}
                      >
                        <td className="p-6 font-semibold text-white">{row.metric}</td>
                        <td className="p-6 text-center text-neutral-400">
                          <div className="flex items-center justify-center gap-2">
                            <row.traditionalIcon className="w-5 h-5 text-red-500" />
                            <span>{row.traditional}</span>
                          </div>
                        </td>
                        <td className="p-6 text-center text-white">
                          <div className="flex items-center justify-center gap-2">
                            <row.delamainIcon className="w-5 h-5 text-green-500 glow" />
                            <span className="font-semibold">{row.delamain}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}