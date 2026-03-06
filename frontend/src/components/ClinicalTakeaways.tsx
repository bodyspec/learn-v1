import { useState, useRef, useEffect, type ReactNode } from 'react'

interface ClinicalTakeawaysProps {
  children: ReactNode
}

export default function ClinicalTakeaways({ children }: ClinicalTakeawaysProps) {
  const [collapsed, setCollapsed] = useState(true)
  const [itemCount, setItemCount] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll('li')
      setItemCount(items.length)
    }
  }, [children])

  const showToggle = itemCount > 5

  return (
    <div className={collapsed && showToggle ? 'takeaways-collapsed' : undefined}>
      <div ref={contentRef}>
        {children}
      </div>
      {showToggle && (
        <button
          className="takeaways-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? `Show all ${itemCount} takeaways` : 'Show fewer'}
        </button>
      )}
    </div>
  )
}
