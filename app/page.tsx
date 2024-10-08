"use client"

import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { LeftPanel } from '@/components/left-panel'
import { ChatWindow } from '@/components/chat-window'
import { RightPanel } from '@/components/right-panel'
import { AuthForm } from '@/components/auth-form'
import { supabase } from '@/lib/supabase'

interface ChatSession {
  id: number;
  name: string;
}

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AuthForm />
      </div>
    )
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={20} minSize={15}>
        <LeftPanel 
          chatSessions={chatSessions} 
          setCurrentSession={setCurrentSession}
        />
      </ResizablePanel>
      <ResizablePanel defaultSize={60}>
        <ChatWindow currentSession={currentSession} />
      </ResizablePanel>
      <ResizablePanel defaultSize={20} minSize={15}>
        <RightPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}