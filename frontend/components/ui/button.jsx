import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-teal text-white hover:bg-teal-dark transition-colors",
    secondary: "bg-neutral-900 text-white border border-teal hover:bg-neutral-800 transition-colors",
    outline: "border border-teal text-teal hover:bg-teal hover:text-white transition-colors",
  }
  
  const sizes = {
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    sm: "px-4 py-2 text-sm",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }