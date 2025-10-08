"use client"

import { useState } from "react"
import AuthForm from "/components/auth-form"
import ArtisticBackground from "/components/artistic-background"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <ArtisticBackground />
      <div className="relative z-10 flex min-h-screen">
        {/* Form section - switches position based on isLogin */}
        <div
          className={`flex w-full items-center justify-center px-8 py-12 transition-all duration-700 ease-in-out md:w-1/2 ${
            isLogin ? "md:order-1" : "md:order-2"
          }`}
        >
          <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
        </div>

        {/* Transparent image panel - switches position based on isLogin */}
        <div
          className={`hidden w-1/2 items-center justify-center transition-all duration-700 ease-in-out md:flex ${
            isLogin ? "md:order-2" : "md:order-1"
          }`}
        >
          <div className="relative h-full w-full">
            {/* Transparent overlay that shows background through */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-accent/10 backdrop-blur-[2px]" />

            {/* Decorative graffiti elements */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="space-y-8 text-center">
                <h2 className="font-sans text-6xl font-extralight tracking-tight text-foreground/80">
                  {isLogin ? "Bienvenido" : "Únete"}
                </h2>
                <p className="font-sans text-xl font-light tracking-wide text-foreground/60">
                  {isLogin ? "Tu espacio creativo te espera" : "Comienza tu viaje creativo"}
                </p>

                {/* Artistic sketch decoration */}
                <div className="mx-auto h-32 w-32 opacity-30">
                  <svg viewBox="0 0 100 100" className="text-accent">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                      className="animate-[spin_20s_linear_infinite]"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      className="animate-[spin_15s_linear_infinite_reverse]"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
