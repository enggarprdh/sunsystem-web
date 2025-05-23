import * as React from "react"

import { cn } from "@/lib/utils"


const Checkbox = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
        <div className="dark:bg-black/10">
            <label className="text-white">
      <input
        type="checkbox"
        className={cn(
          "dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out hover:scale-110 dark:checked:scale-100 w-5 h-5",
          className
        )}
        ref={ref}
        {...props}
      />
      </label>
      </div>
    )
  }
)
Checkbox.displayName = "Input"

export { Checkbox }
