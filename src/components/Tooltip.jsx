// Komponen Tooltip menggunakan @radix-ui/react-tooltip
import * as RadixTooltip from '@radix-ui/react-tooltip'

export function TooltipProvider({ children }) {
  return <RadixTooltip.Provider delayDuration={300}>{children}</RadixTooltip.Provider>
}

export default function Tooltip({ children, content, side = 'top' }) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={6}
          style={{
            background: '#1a1a2e',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            maxWidth: 220,
            lineHeight: 1.5
          }}
        >
          {content}
          <RadixTooltip.Arrow style={{ fill: '#1a1a2e' }} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
