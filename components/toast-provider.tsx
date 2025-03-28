"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast, ToastTitle, ToastDescription } from "@/components/ui/toast"
import { useEffect, useState } from "react"

export function ToastProvider() {
  const { toasts, dismiss } = useToast()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 right-0 z-[100] flex flex-col gap-2 p-4 max-w-md w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant} onClose={() => dismiss(toast.id)}>
          <ToastTitle>{toast.title}</ToastTitle>
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
        </Toast>
      ))}
    </div>
  )
}

