import React from "react"
import Dashboard from "@/components/layout/Dashboard"

export default function IndustryAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Dashboard>{children}</Dashboard>
} 