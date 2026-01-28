import React, { createContext, useContext, useEffect, useState } from "react"

export type FontFamily = "hanken" | "montreal" | "sen" | "manrope"

type FontProviderProps = {
  children?: React.ReactNode
  defaultFont?: FontFamily
  storageKey?: string
}

type FontProviderState = {
  font: FontFamily
  setFont: (font: FontFamily) => void
}

const initialState: FontProviderState = {
  font: "manrope",
  setFont: () => null,
}

const FontProviderContext = createContext<FontProviderState>(initialState)

// Mapping logic to CSS variables
const fontMap: Record<FontFamily, string> = {
  hanken: '"Hanken Grotesk", sans-serif',
  montreal: '"Inter", sans-serif', // Using Inter as fallback for Neue Montreal
  sen: '"Sen", sans-serif',
  manrope: '"Manrope", sans-serif'
}

export function FontProvider({
  children,
  defaultFont = "manrope",
  storageKey = "synapse-font",
  ...props
}: FontProviderProps) {
  const [font, setFont] = useState<FontFamily>(
    () => (localStorage.getItem(storageKey) as FontFamily) || defaultFont
  )

  useEffect(() => {
    const root = window.document.documentElement
    // Set the CSS variable that Tailwind is configured to use
    root.style.setProperty('--font-primary', fontMap[font])
  }, [font])

  const value = {
    font,
    setFont: (newFont: FontFamily) => {
      localStorage.setItem(storageKey, newFont)
      setFont(newFont)
    },
  }

  return (
    <FontProviderContext.Provider {...props} value={value}>
      {children}
    </FontProviderContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontProviderContext)

  if (context === undefined)
    throw new Error("useFont must be used within a FontProvider")

  return context
}