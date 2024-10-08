"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Settings } from 'lucide-react'

interface ChatSession {
  id: number;
  name: string;
}

interface LeftPanelProps {
  chatSessions: ChatSession[];
  setCurrentSession: (session: ChatSession) => void;
}

export function LeftPanel({ chatSessions, setCurrentSession }: LeftPanelProps) {
  const [sessions, setSessions] = useState<ChatSession[]>(chatSessions || [])

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now(),
      name: `Chat ${sessions.length + 1}`,
    }
    setSessions([...sessions, newSession])
    setCurrentSession(newSession)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Button onClick={createNewSession} className="w-full mb-4">
          <PlusCircle className="mr-2 h-4 w-4" /> New Chat
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        {sessions.map((session) => (
          <Button
            key={session.id}
            onClick={() => setCurrentSession(session)}
            variant="ghost"
            className="w-full justify-start"
          >
            {session.name}
          </Button>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>
    </div>
  )
}