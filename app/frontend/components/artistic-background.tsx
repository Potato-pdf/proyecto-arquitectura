"use client"

import { useEffect, useRef } from "react"

export default function ArtisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const drawGraffitiPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const colors = [
        "rgba(40, 40, 40, 0.15)",
        "rgba(60, 60, 60, 0.12)",
        "rgba(80, 80, 80, 0.18)",
        "rgba(88, 166, 255, 0.1)",
      ]

      for (let i = 0; i < 35; i++) {
        ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)]
        ctx.lineWidth = Math.random() * 5 + 2.5
        ctx.lineCap = "round"

        ctx.beginPath()
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        ctx.moveTo(startX, startY)

        for (let j = 0; j < 6; j++) {
          const cpX = startX + (Math.random() - 0.5) * 500
          const cpY = startY + (Math.random() - 0.5) * 500
          const endX = startX + (Math.random() - 0.5) * 700
          const endY = startY + (Math.random() - 0.5) * 700
          ctx.quadraticCurveTo(cpX, cpY, endX, endY)
        }

        ctx.stroke()
      }

      for (let i = 0; i < 18; i++) {
        ctx.strokeStyle = "rgba(50, 50, 50, 0.08)"
        ctx.lineWidth = 1.5

        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 250 + 150

        for (let j = 0; j < 25; j++) {
          ctx.beginPath()
          ctx.moveTo(x + j * 6, y)
          ctx.lineTo(x + j * 6, y + size)
          ctx.stroke()
        }
      }

      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)]
        ctx.lineWidth = Math.random() * 3 + 2
        ctx.beginPath()
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 100 + 50
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    drawGraffitiPattern()

    let animationFrame: number
    let opacity = 0.05
    let direction = 1

    const animate = () => {
      opacity += direction * 0.0003
      if (opacity >= 0.12 || opacity <= 0.05) {
        direction *= -1
      }
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />
      <div className="absolute inset-0 z-0 opacity-[0.06]">
        <svg
          className="absolute -left-20 top-20 h-96 w-96 animate-[float_20s_ease-in-out_infinite]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,39.8,76.8C25.8,84.6,8.8,87.6,-7.2,87.1C-23.2,86.6,-38.4,82.6,-52.8,75.2C-67.2,67.8,-80.8,56.9,-87.6,42.8C-94.4,28.7,-94.4,11.4,-91.8,-4.9C-89.2,-21.2,-84,-36.5,-75.2,-49.8C-66.4,-63.1,-54,-74.4,-39.8,-81.4C-25.6,-88.4,-9.6,-91.1,4.7,-88.9C19,-86.7,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute -right-20 bottom-20 h-80 w-80 animate-[float_25s_ease-in-out_infinite_reverse]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M39.5,-65.5C51.4,-58.2,61.3,-47.3,68.4,-34.8C75.5,-22.3,79.8,-8.2,79.6,5.9C79.4,20,74.7,34.1,66.3,46.3C57.9,58.5,45.8,68.8,32.1,74.8C18.4,80.8,3.1,82.5,-12.3,81.1C-27.7,79.7,-43.2,75.2,-56.3,67.2C-69.4,59.2,-80.1,47.7,-85.3,34.1C-90.5,20.5,-90.2,4.8,-86.3,-9.8C-82.4,-24.4,-74.9,-37.9,-64.7,-49.2C-54.5,-60.5,-41.6,-69.6,-28.1,-76.3C-14.6,-83,-0.5,-87.3,12.8,-84.8C26.1,-82.3,27.6,-72.8,39.5,-65.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </>
  )
}
