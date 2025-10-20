import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
// @ts-ignore: Allow side-effect CSS import without type declarations
import "./globals.css"

export const metadata: Metadata = {
  title: "Proyecto Arquitectura - Auth",
  description: "Sistema de autenticación",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
