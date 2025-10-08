"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login attempt:", { email, password })
    // Handle login logic here
  }

  return (
    <div className="w-full max-w-md">
      {/* Artistic container with subtle backdrop */}
      <div className="relative">
        {/* Decorative sketch element */}
        <div className="absolute -left-8 -top-8 h-16 w-16 opacity-20">
          <svg viewBox="0 0 100 100" className="text-foreground">
            <path
              d="M10,50 Q30,20 50,50 T90,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-[sketch-draw_2s_ease-in-out]"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 0,
              }}
            />
          </svg>
        </div>

        <div className="space-y-8 rounded-sm bg-card/50 p-8 backdrop-blur-sm md:p-12">
          {/* Header with artistic typography */}
          <div className="space-y-3 text-center">
            <h1 className="font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl">Bienvenido</h1>
            <p className="font-sans text-sm font-light tracking-wide text-muted-foreground">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field with pencil underline effect */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-sm font-light tracking-wide text-foreground">
                Correo electrónico
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b-2 border-border bg-transparent px-0 py-3 font-sans text-base font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="tu@email.com"
                  required
                />
                {/* Animated pencil underline */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    focusedField === "email" ? "w-full" : "w-0"
                  }`}
                  style={{
                    boxShadow: focusedField === "email" ? "0 0 8px rgba(88, 166, 255, 0.3)" : "none",
                  }}
                />
              </div>
            </div>

            {/* Password field with pencil underline effect */}
            <div className="space-y-2">
              <Label htmlFor="password" className="font-sans text-sm font-light tracking-wide text-foreground">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b-2 border-border bg-transparent px-0 py-3 font-sans text-base font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="••••••••"
                  required
                />
                {/* Animated pencil underline */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    focusedField === "password" ? "w-full" : "w-0"
                  }`}
                  style={{
                    boxShadow: focusedField === "password" ? "0 0 8px rgba(88, 166, 255, 0.3)" : "none",
                  }}
                />
              </div>
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end">
              <button
                type="button"
                className="font-sans text-sm font-light text-muted-foreground transition-colors hover:text-accent"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit button with graffiti-style hover effect */}
            <Button
              type="submit"
              className="group relative w-full overflow-hidden bg-foreground py-6 font-sans text-base font-light tracking-wide text-background transition-all hover:bg-foreground/90"
            >
              <span className="relative z-10">Iniciar Sesión</span>
              {/* Subtle graffiti texture on hover */}
              <div className="absolute inset-0 z-0 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </Button>
          </form>

          {/* Footer */}
          <div className="space-y-4 pt-6 text-center">
            <div className="h-px w-full bg-border" />
            <p className="font-sans text-sm font-light text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <button className="font-normal text-accent transition-colors hover:text-accent/80">Regístrate</button>
            </p>
          </div>
        </div>

        {/* Decorative sketch element bottom right */}
        <div className="absolute -bottom-8 -right-8 h-16 w-16 opacity-20">
          <svg viewBox="0 0 100 100" className="text-accent">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
