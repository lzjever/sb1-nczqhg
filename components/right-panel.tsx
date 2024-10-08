"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

export function RightPanel() {
  return (
    <ScrollArea className="h-full p-4">
      <h2 className="text-lg font-semibold mb-2">Chat Status</h2>
      <p>Connected to server</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Notifications</h2>
      <p>No new notifications</p>
    </ScrollArea>
  )
}