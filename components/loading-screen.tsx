"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

type Props = {
  onComplete?: () => void
}

export function LoadingScreen({ onComplete }: Props) {
  const [percentage, setPercentage] = useState(0)
  const totalBlocks = 10
  const filledBlocks = Math.floor((percentage / 100) * totalBlocks)

  useEffect(() => {
    const duration = 1000 // 1 second total (fast)
    const interval = 10 // smoother increments
    const steps = Math.max(1, Math.floor(duration / interval))
    const increment = 100 / steps

    let mounted = true
    const timer = setInterval(() => {
      setPercentage((prev) => {
        const next = Math.min(100, prev + increment)
        if (next >= 100) {
          clearInterval(timer)
          // small delay so UI shows 100% briefly
          setTimeout(() => {
            if (!mounted) return
            try {
              onComplete?.()
            } catch (err) {
              // swallow to avoid breaking the app
              console.warn("LoadingScreen onComplete threw:", err)
            }
          }, 200)
          return 100
        }
        return next
      })
    }, interval)

    return () => {
      mounted = false
      clearInterval(timer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-[#e8e5e0] overflow-hidden px-12 z-[9999]">
      {/* Background horizontal lines */}
      <div className="absolute inset-0 flex flex-col justify-around py-12 px-12 pointer-events-none">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="w-full h-[1px] bg-gray-300/40" />
        ))}
      </div>

      {/* Content container */}
      <div className="relative h-full flex">
        <Card className="absolute left-0 top-32 p-6 shadow-xl bg-white border-gray-200 min-w-[320px]">
          <h2 className="text-xs font-semibold text-gray-500 mb-4 tracking-wide uppercase">Loader</h2>

          <div className="flex gap-1.5 mb-3">
            {Array.from({ length: totalBlocks }).map((_, index) => (
              <div
                key={index}
                className={`w-5 h-6 rounded-sm transition-colors duration-300 ${
                  index < filledBlocks ? "bg-gray-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Percentage Counter */}
          <div className="text-right text-gray-500 text-sm font-mono">{Math.floor(percentage)}%</div>
        </Card>

        {/* Decorative Cards */}
        <Card className="absolute top-20 right-20 p-6 shadow-lg rotate-2 bg-white border-gray-200 max-w-[280px]">
          <p className="text-gray-600 text-sm leading-relaxed font-mono tracking-tight">
            URBAN FLARE
            <br />
            COLLECTION
            <br />
            2024
          </p>
        </Card>

        <Card className="absolute bottom-32 left-20 p-6 shadow-lg -rotate-3 bg-white border-gray-200 max-w-[280px]">
          <p className="text-gray-600 text-sm leading-relaxed font-mono tracking-tight">
            STREET STYLE,
            <br />
            BOLD COLORS,
            <br />
            PURE ATTITUDE:
            <br />
            <span className="block mt-2">
              URBAN FLARE
              <br />
              UNLEASHED
            </span>
          </p>
        </Card>

        <Card className="absolute right-32 top-1/2 p-6 shadow-lg rotate-1 bg-white border-gray-200 max-w-[300px]">
          <h3 className="text-xs font-semibold text-gray-500 mb-3 tracking-wide uppercase">Featured</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Discover the latest Urban Flare styles that blend contemporary fashion with street culture.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            Explore exclusive drops and limited editions designed for the bold.
          </p>
        </Card>

      </div>
    </div>
  )
}

export default LoadingScreen
