"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

const queryClient = new QueryClient()

export default function MainProvider({children, ...props}: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="g-root g-root_theme_light">
        {children}
      </div>
    </QueryClientProvider>
  )
}
