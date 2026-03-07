interface ResponsiveImageEntry {
  srcset: string
  srcsetFallback: string
  sizes: string
  originalWidth: number
  originalHeight: number
}

type Manifest = Record<string, ResponsiveImageEntry>

// Load manifest eagerly — returns empty object if file doesn't exist (dev without running script)
const manifestModules = import.meta.glob('@content/assets/diagrams/_responsive/manifest.json', { eager: true }) as Record<string, { default: Manifest }>

const manifest: Manifest = Object.values(manifestModules)[0]?.default ?? {}

export function getResponsiveProps(src: string | undefined): ResponsiveImageEntry | null {
  if (!src) return null
  return manifest[src] ?? null
}
