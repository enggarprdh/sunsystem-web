import * as React from "react"
import { Switch as RadixSwitch } from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

const Switch = React.forwardRef<React.ElementRef<typeof RadixSwitch>, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <RadixSwitch
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-zinc-200 dark:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900",
        checked ? "bg-blue-500 dark:bg-blue-600" : "",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white dark:bg-zinc-900 shadow-lg ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </RadixSwitch>
  )
)
Switch.displayName = "Switch"

export { Switch }
