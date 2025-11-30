"use client"

import { useState, useEffect } from "react"
import { LoadingScreen } from "@/components/loading-screen"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentReadyIndex, setCurrentReadyIndex] = useState(0)
  const [randomBoxes, setRandomBoxes] = useState<
    Array<{
      id: number
      color: string
      size: string
      left: string
      top: string
      visible: boolean
    }>
  >([])

  const brandImages = [
    "/images/urban-flare-street-style-fashion-1.jpg",
    "/images/streetwear-clothing-t-shirt.jpg",
    "/images/fashion-jacket-hoodie.jpg",
    "/images/urban-flare-street-style-fashion-1.jpg",
    "/images/urban-flare-street-style.jpg",
    "/images/urban-flare-streetwear-collection-2.jpg",
    "/images/urban-flare-urban-fashion-brand-3.jpg",
    "/images/urban-sneakers-shoes.jpg",
    "/images/urban-flare-aesthetic-logo.jpg",
    "/images/urban-flare-street-style.jpg",
    "/images/urban-flare-collection.jpg",
    "/images/urban-flare-aesthetic-logo.jpg",
    "/images/premium-accessories.jpg",
  ]

  const readyContent = [
    { emoji: "👕", text: "Ready to explore the new Urban Flare collection?" },
    { emoji: "👟", text: "Check out our fresh sneaker lineup?" },
    { emoji: "🧥", text: "Discover our latest streetwear jackets?" },
    { emoji: "👔", text: "Explore premium accessories for your style?" },
    { emoji: "🎒", text: "Browse our exclusive bag collection?" },
  ]

  const boxColors = [
    "bg-slate-200/15",
    "bg-blue-200/12",
    "bg-gray-300/10",
    "bg-slate-300/13",
    "bg-blue-100/15",
    "bg-gray-200/12",
    "bg-indigo-200/10",
    "bg-slate-100/18",
    "bg-slate-300/20",
    "bg-blue-300/18",
    "bg-indigo-300/15",
    "bg-cyan-200/20",
    "bg-purple-200/18",
    "bg-pink-200/15",
    "bg-teal-200/18",
    "bg-sky-300/20",
    "bg-violet-200/15",
    "bg-slate-400/18",
    "bg-blue-200/20",
    "bg-indigo-200/18",
  ]

  const boxSizes = ["w-24 h-24", "w-32 h-32", "w-40 h-40", "w-48 h-48", "w-36 h-36", "w-28 h-28", "w-44 h-44"]

  useEffect(() => {
    console.log("[v0] Loading state:", isLoading)
  }, [isLoading])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % brandImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [brandImages.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReadyIndex((prev) => (prev + 1) % readyContent.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [readyContent.length])

  useEffect(() => {
    let boxId = 0
    const timeoutIds: number[] = []
    const createRandomBox = () => {
      const newBox = {
        id: boxId++,
        color: boxColors[Math.floor(Math.random() * boxColors.length)],
        size: boxSizes[Math.floor(Math.random() * boxSizes.length)],
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        visible: true,
      }

      setRandomBoxes((prev) => [...prev, newBox])

      const fadeOutTime = 2000 + Math.random() * 4000
      const removeTime = fadeOutTime + 1000 + Math.random() * 2000

      const fadeTimeout = setTimeout(() => {
        setRandomBoxes((prev) => prev.map((box) => (box.id === newBox.id ? { ...box, visible: false } : box)))
      }, fadeOutTime) as unknown as number
      timeoutIds.push(fadeTimeout)

      const removeTimeout = setTimeout(() => {
        setRandomBoxes((prev) => prev.filter((box) => box.id !== newBox.id))
      }, removeTime) as unknown as number
      timeoutIds.push(removeTimeout)
    }

    const interval = setInterval(
      () => {
        const numBoxes = Math.floor(Math.random() * 2) + 1 // 1-2 boxes at a time
        for (let i = 0; i < numBoxes; i++) {
          createRandomBox()
        }
      },
      800 + Math.random() * 1200,
    ) // Random interval between 800-2000ms

    return () => {
      clearInterval(interval)
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="min-h-screen bg-[#fffdfa] relative overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 z-0">
          {randomBoxes.map((box) => (
            <div
              key={box.id}
              className={`absolute ${box.size} ${box.color} rounded-3xl transition-opacity duration-1000 ${
                box.visible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: box.left,
                top: box.top,
              }}
            />
          ))}
        </div>

        <header className="relative z-20 flex items-center justify-between p-8">
          <div className="bg-gray-200/30 backdrop-blur-md px-5 py-2 rounded-full text-gray-600 text-sm tracking-wider shadow-md">
            INTRO
          </div>
          <div className="text-gray-600 text-sm tracking-wider flex items-center gap-2">
            WELCOME <span>👋</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-gray-500 text-xs tracking-widest font-medium">URBAN FLARE</div>
              <div className="text-gray-500 text-[10px] tracking-wider">2025 REWIND</div>
            </div>
            <div className="text-2xl font-black">:UF</div>
          </div>
        </header>

        <div className="relative z-10 flex items-center justify-center mt-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-8 mb-4">
              <span
                className="text-9xl font-black italic tracking-tight flex"
                style={{
                  color: "#000000",
                  textShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                  fontWeight: 900,
                }}
              >
                {"STREET ARCHIVE".split("").map((char, i) => (
                  <span
                    key={i}
                    className="transition-colors duration-100 hover:text-[#2bb3be] hover:scale-110 inline-block"
                    style={{ transitionDelay: `${i * 5}ms` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center my-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#9dbde8] via-[#b5ccf0] to-[#9dbde8] rounded-lg shadow-2xl shadow-gray-800/30 w-[1200px] overflow-hidden py-8">

            <div className="overflow-hidden whitespace-nowrap">
              <h1
                className="inline-block text-white text-6xl font-bold tracking-wider uppercase animate-marquee"
                style={{
                  letterSpacing: "0.3em",
                  textShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                  fontFamily: '"Press Start 2P", "Courier New", monospace',
                  imageRendering: "pixelated",
                  WebkitFontSmoothing: "none",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                {"♪ NEW STYLE DROP ♪ YEAR IN REVIEW ♪ NEW STYLE DROP ♪ YEAR IN REVIEW ♪"}
              </h1>
            </div>
          </div>
        </div>

        {/* Studio/Brand section */}
        <div className="relative z-10 flex items-center justify-center gap-9 mt-16 ml-64">
          <span className="text-xl text-gray-600">by</span>
          <div className="w-40 h-40 rounded-lg shadow-md overflow-hidden transition-all duration-500">
            <img
              src={brandImages[currentImageIndex] || "/images/urban-flare-collection.jpg"}
              alt="Urban Flare Brand"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="text-6xl font-bold">URBAN</div>
            <div className="text-6xl font-bold">FLARE</div>
          </div>
          <div className="ml-8 w-80">
            <div className="bg-gray-400/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-5 py-2 border-b border-white/30">
                <h3 className="text-white text-sm font-semibold uppercase tracking-wide">Ready?</h3>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/50"></div>
                  <div className="w-3 h-3 rounded-full bg-white/50"></div>
                </div>
              </div>
              <div className="px-5 py-3">
                <div className="flex items-start gap-3 mb-2 transition-all duration-500">
                  <span className="text-3xl">{readyContent[currentReadyIndex].emoji}</span>
                  <p className="text-white text-sm leading-relaxed">{readyContent[currentReadyIndex].text}</p>
                </div>
              </div>
              <div className="px-3 py-2 border-t border-white/30 sm:px-5">
                <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                  Enter Site
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Style */}
        <div className="absolute left-30 top-[36%] -translate-y-1/2 w-80 z-0">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden h-[400px]">
            <div className="group w-full h-full">
              <img
                src="/images/urban-flare-collection.jpg"
                alt="Featured Style"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>
            <div className="absolute top-6 left-6 z-10">
              <div
                className="text-white text-sm tracking-widest mb-2"
                style={{
                  fontStyle: "italic",
                  fontFamily: "serif",
                }}
              >
                S:N 00/25
              </div>
              <div
                className="text-white text-3xl font-bold uppercase tracking-wider"
                style={{
                  fontFamily: '"Press Start 2P", "Courier New", monospace',
                  imageRendering: "pixelated",
                  textShadow: "3px 3px 0px rgba(0,0,0,0.6)",
                }}
              >
                FEATURED
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
              <h3 className="text-white text-2xl font-bold mb-2">Wear Your Power. Own Your Story</h3>
              <p className="text-white/90 text-sm">Express yourself through style</p>
            </div>
          </div>
        </div>

        {/* Content rail - aligned left now */}
        <section className="relative z-10 mt-60 px-4 md:px-8 pb-32">
          {/* Label row shifted to align with left rail */}
          <div className="flex items-start justify-start mb-12 max-w-[1200px] ml-16">
            <h2 className="text-gray-500 text-sm tracking-widest uppercase">CATEGORIES</h2>
          </div>

          {/* Left-aligned content rail */}
          <div className="flex gap-8 lg:gap-12 items-stretch max-w-[1200px] ml-16">
            {/* Large Card - SPRING (fixed width so rail stays left) */}
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-[600px] w-[720px] flex-shrink-0">
              <div className="group w-full h-full">
                <img
                  src="/images/urban-streetwear-fashion-landscape-aesthetic.jpg"
                  alt="Spring Collection"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <div className="absolute top-6 left-6 z-10">
                <div
                  className="text-white text-sm tracking-widest mb-2"
                  style={{
                    fontStyle: "italic",
                    fontFamily: "serif",
                  }}
                >
                  S:N 01/25
                </div>
                <div
                  className="text-white text-6xl font-bold uppercase tracking-wider"
                  style={{
                    fontFamily: '"Press Start 2P", "Courier New", monospace',
                    imageRendering: "pixelated",
                    textShadow: "3px 3px 0px rgba(0,0,0,0.6)",
                  }}
                >
                  SPRING
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Style with Purpose</h3>
                <p className="text-white/90 text-sm">Express yourself Fearless Fits Only</p>
              </div>
            </div>

            {/* Right Column - Two Stacked Cards */}
            <div className="flex gap-8 lg:gap-12 w-full">
              <div className="flex flex-col gap-6 w-full lg:w-[400px] shrink-0">
                {/* Urban Card */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-[285px]">
                  <div className="group w-full h-full">
                    <img
                      src="/images/urban-streetwear-silhouette-portrait-aesthetic.jpg"
                      alt="Urban Collection"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                  <div className="absolute top-6 left-6 z-10">
                    <div
                      className="text-white text-sm tracking-widest mb-2"
                      style={{
                        fontStyle: "italic",
                        fontFamily: "serif",
                      }}
                    >
                      S:N 02/25
                    </div>
                    <div
                      className="text-white text-4xl font-bold uppercase tracking-wider"
                      style={{
                        fontFamily: '"Press Start 2P", "Courier New", monospace',
                        imageRendering: "pixelated",
                        textShadow: "3px 3px 0px rgba(0,0,0,0.6)",
                      }}
                    >
                      URBAN
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold mb-1">Urban Essentials</h3>
                    <p className="text-white/90 text-sm">Street-ready staples</p>
                  </div>
                </div>

                {/* Premium Card */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-[285px]">
                  <div className="group w-full h-full">
                    <img
                      src="/images/luxury-fashion-accessories-premium-aesthetic.jpg"
                      alt="Premium Collection"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                  <div className="absolute top-6 left-6 z-10">
                    <div
                      className="text-white text-sm tracking-widest mb-2"
                      style={{
                        fontStyle: "italic",
                        fontFamily: "serif",
                      }}
                    >
                      S:N 03/25
                    </div>
                    <div
                      className="text-white text-4xl font-bold uppercase tracking-wider"
                      style={{
                        fontFamily: '"Press Start 2P", "Courier New", monospace',
                        imageRendering: "pixelated",
                        textShadow: "3px 3px 0px rgba(0,0,0,0.6)",
                      }}
                    >
                      PREMIUM
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold mb-1">Premium Line</h3>
                    <p className="text-white/90 text-sm">Elevated luxury pieces</p>
                  </div>
                </div>
              </div>

              {/* Right: Shop Now & Style x You column */}
              <div className="flex flex-col gap-6 w-full lg:w-[400px] shrink-0">
                {/* Shop Now Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="text-gray-500 text-xs tracking-widest font-medium">URBAN FLARE</div>
                    <div className="text-2xl font-black">:UF</div>
                  </div>
                  <div className="w-full flex items-center justify-start mb-4">
                    <div
                      className="w-full bg-gray-100/80 backdrop-blur-md rounded-lg px-4 py-2 flex gap-4 items-center text-gray-700 text-sm font-mono tracking-widest uppercase"
                      style={{
                        fontFamily: 'monospace',
                        letterSpacing: '0.08em',
                      }}
                    >
                      <span>🎵 FEMI</span>
                      <span>🎵 GROUP 256</span>
                    </div>
                  </div>
                  <div className="font-bold text-lg mb-1">Urban Flare</div>
                  <div className="text-gray-600 text-sm mb-4">Curated looks from our favourite designers</div>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors">Shop Now</button>
                </div>

                {/* Style x You Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                  <div className="text-4xl mb-2">👕</div>
                  <div className="font-bold text-lg mb-1">Style x You</div>
                  <div className="text-gray-600 text-sm mb-4 text-center">Get a personalised page based on your fashion preferences</div>
                  <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors cursor-not-allowed" disabled>Coming soon</button>
                </div>

                {/* Privacy Policy Footer - placed just below the two cards */}
                <footer className="w-full flex flex-col items-center justify-center mt-4 mb-2">
                  <a href="#" className="text-xs text-gray-500 underline mb-1">Privacy Policy</a>
                  <div className="text-xs text-gray-400">©2025 Urban Flare</div>
                  <div className="text-xs text-gray-400">With <span className="text-pink-500">♥</span> from Design</div>
                </footer>
              </div>
            </div>
          </div>
        </section>

      
        {/* Style Alert */}
        <div className="absolute left-8 top-32 w-80 z-20">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
              <h3 className="text-gray-800 text-sm font-semibold uppercase tracking-wide">Style Alert</h3>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              </div>
            </div>
            <div className="px-6 py-2">
              <div className="flex items-start gap-3 mb-1">
                <span className="text-2xl">✨</span>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sign up for exclusive updates on new drops and limited collections.
                </p>
              </div>
            </div>
            <div className="px-6 py-2 border-t border-gray-200">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>

        {/* UF Collection */}
        <div className="absolute right-8 top-[9.5rem] w-80 z-30">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
              <h3 className="text-gray-800 text-sm font-semibold uppercase tracking-wide">UF Collection</h3>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              </div>
            </div>
            <div className="px-6 py-2">
              <div className="flex items-start gap-3 mb-1">
                <span className="text-2xl">👕</span>
                <p className="text-gray-600 text-sm leading-relaxed">Curated looks from our favourite designers</p>
              </div>
            </div>
            <div className="px-6 py-2 border-t border-gray-200">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>

      {/* Shop Now Section */}
      <section className="w-full flex justify-center items-center py-10 bg-gradient-to-b from-transparent to-gray-50">
        <button
          className="px-8 py-4 text-2xl font-extrabold rounded-full bg-gradient-to-r from-[#a0c9ff] via-[#b5ccf0] to-[#9dbde8] text-white shadow-2xl transition-all duration-200 tracking-wide drop-shadow-lg hover:scale-110 hover:shadow-3xl hover:bg-gradient-to-r hover:from-[#b5ccf0] hover:via-[#a0c9ff] hover:to-[#b5ccf0] focus:outline-none focus:ring-4 focus:ring-[#9dbde8]/40"
          style={{
            WebkitTextStroke:'1px black',
          }}
        >
          Shop Now
        </button>
      </section>
      {/* Footer with social media icons and brand tagline */}
      <footer className="w-full bg-[#5ba6ac] py-8 mt-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex gap-6 text-2xl text-white">
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-pink-400 transition-transform duration-200 hover:scale-125 hover:drop-shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-blue-400 transition-transform duration-200 hover:scale-125 hover:drop-shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.05h-2.1v-2.9h2.1V9.8c0-2.07 1.23-3.22 3.13-3.22.91 0 1.86.16 1.86.16v2.05h-1.05c-1.04 0-1.36.65-1.36 1.32v1.59h2.3l-.37 2.9h-1.93v7.05A10 10 0 0 0 22 12" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" className="hover:text-sky-400 transition-transform duration-200 hover:scale-125 hover:drop-shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M17.5 3h-11A3.5 3.5 0 0 0 3 6.5v11A3.5 3.5 0 0 0 6.5 21h11a3.5 3.5 0 0 0 3.5-3.5v-11A3.5 3.5 0 0 0 17.5 3zm-1.13 12.47h-1.7l-2.13-3.13-2.13 3.13h-1.7l2.98-4.37-2.98-4.37h1.7l2.13 3.13 2.13-3.13h1.7l-2.98 4.37 2.98 4.37z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" className="hover:text-red-600 transition-transform duration-200 hover:scale-125 hover:drop-shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M21.8 8.001a2.752 2.752 0 0 0-1.936-1.946C18.07 5.5 12 5.5 12 5.5s-6.07 0-7.864.555A2.752 2.752 0 0 0 2.2 8.001C1.5 9.795 1.5 12 1.5 12s0 2.205.7 3.999a2.752 2.752 0 0 0 1.936 1.946C5.93 18.5 12 18.5 12 18.5s6.07 0 7.864-.555a2.752 2.752 0 0 0 1.936-1.946C22.5 14.205 22.5 12 22.5 12s0-2.205-.7-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>
          </div>
          <div className="mt-2 text-white text-sm font-medium tracking-wide text-center hover:text-[#ffe082] transition-colors duration-200 cursor-pointer">
            Urban Flare — Elevate Your Style. Designed for the modern streetwear enthusiast.
          </div>
        </div>
      </footer>
    </main>
  )
}
