"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import { Send, Paperclip } from 'lucide-react'

interface ChatSession {
  id: number;
  name: string;
}

interface ChatWindowProps {
  currentSession: ChatSession | null;
}

export function ChatWindow({ currentSession }: ChatWindowProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      // Simulate streaming response
      setIsStreaming(true)
      let response = "This is a simulated streaming response. "
      let i = 0
      const interval = setInterval(() => {
        if (i < 5) {
          response += "More text is being added. "
          setMessages(prev => [
            ...prev.slice(0, -1),
            { role: 'assistant', content: response }
          ])
          i++
        } else {
          clearInterval(interval)
          setIsStreaming(false)
        }
      }, 1000)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file.name)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="cursor-pointer">
              <Paperclip className="h-4 w-4" />
            </Button>
          </label>
          <Button onClick={handleSend} disabled={isStreaming}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}