"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PropsWithChildren } from "react"

const queryClient = new QueryClient()

export default function MainProvider({children, ...props}: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}
