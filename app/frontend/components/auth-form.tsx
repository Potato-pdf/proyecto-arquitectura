"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthFormProps {
  isLogin: boolean
  onToggle: () => void
}

export default function AuthForm({ isLogin, onToggle }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`[v0] ${isLogin ? "Login" : "Register"} attempt:`, { email, password, name })
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="relative w-full px-8 md:px-16 lg:px-20">
        <div className="space-y-10 rounded-sm bg-background p-12 md:p-16 lg:p-20">
          <div className="space-y-4 text-center">
            <h1 className="font-sans text-5xl font-extralight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {isLogin ? "Bienvenido" : "Crear Cuenta"}
            </h1>
            <p className="font-sans text-base font-light tracking-wide text-muted-foreground md:text-lg">
              {isLogin ? "Ingresa tus credenciales para continuar" : "Completa el formulario para registrarte"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div className="space-y-3">
                <Label htmlFor="name" className="font-sans text-base font-light tracking-wide text-foreground">
                  Nombre completo
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                    placeholder="Tu nombre"
                    required
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                      focusedField === "name" ? "w-full" : "w-0"
                    }`}
                    style={{
                      boxShadow: focusedField === "name" ? "0 0 12px rgba(88, 166, 255, 0.4)" : "none",
                    }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="email" className="font-sans text-base font-light tracking-wide text-foreground">
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
                  className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="tu@email.com"
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                    focusedField === "email" ? "w-full" : "w-0"
                  }`}
                  style={{
                    boxShadow: focusedField === "email" ? "0 0 12px rgba(88, 166, 255, 0.4)" : "none",
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="font-sans text-base font-light tracking-wide text-foreground">
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
                  className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="••••••••"
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                    focusedField === "password" ? "w-full" : "w-0"
                  }`}
                  style={{
                    boxShadow: focusedField === "password" ? "0 0 12px rgba(88, 166, 255, 0.4)" : "none",
                  }}
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="font-sans text-sm font-light text-muted-foreground transition-colors hover:text-accent"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="group relative w-full overflow-hidden bg-foreground py-7 font-sans text-lg font-light tracking-wide text-background transition-all hover:bg-foreground/90"
            >
              <span className="relative z-10">{isLogin ? "Iniciar Sesión" : "Registrarse"}</span>
              <div className="absolute inset-0 z-0 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </Button>
          </form>

          <div className="space-y-4 pt-6 text-center">
            <div className="h-px w-full bg-border" />
            <p className="font-sans text-base font-light text-muted-foreground">
              {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
              <button onClick={onToggle} className="font-normal text-accent transition-colors hover:text-accent/80">
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
