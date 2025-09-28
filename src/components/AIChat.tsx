import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Clock, Wrench, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { chatService, formatTime, renderToolCall } from '@/lib/chat';
import type { ChatState } from '../../worker/types';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
export function AIChat() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    sessionId: chatService.getSessionId(),
    isProcessing: false,
    model: 'google-ai-studio/gemini-2.5-flash',
    streamingMessage: ''
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.streamingMessage]);
  const loadCurrentSession = useCallback(async () => {
    const response = await chatService.getMessages();
    if (response.success && response.data) {
      setChatState(prev => ({
        ...prev,
        ...response.data,
        sessionId: chatService.getSessionId()
      }));
    }
  }, []);
  useEffect(() => {
    // Only create a new session if one doesn't already exist.
    // This preserves chat history when navigating away and back.
    if (!chatService.getSessionId()) {
      chatService.newSession();
    }
    loadCurrentSession();
  }, [loadCurrentSession]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const message = input.trim();
    setInput('');
    setIsLoading(true);
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: message,
      timestamp: Date.now()
    };
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      streamingMessage: ''
    }));
    await chatService.sendMessage(message, chatState.model, (chunk) => {
      setChatState(prev => ({
        ...prev,
        streamingMessage: (prev.streamingMessage || '') + chunk
      }));
    });
    await loadCurrentSession();
    setIsLoading(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <div className="h-full flex flex-col bg-zinc-900/30 border border-dashed border-white/10 rounded-lg">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {chatState.messages.length === 0 && !chatState.streamingMessage && (
            <div className="text-center text-muted-foreground py-8 flex flex-col items-center justify-center h-full">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50 text-primary" />
              <p className="font-display text-xl">AI Concierge</p>
              <p>How can I assist you today?</p>
            </div>
          )}
          {chatState.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div className={cn('max-w-[80%] p-3 rounded-2xl', msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  <span className="text-xs opacity-70"><Clock className="w-3 h-3 inline mr-1" />{formatTime(msg.timestamp)}</span>
                </div>
                <p className="whitespace-pre-wrap mb-2">{msg.content}</p>
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-current/20">
                    <div className="flex items-center gap-1 mb-2 text-xs opacity-70"><Wrench className="w-3 h-3" />Tools used:</div>
                    {msg.toolCalls.map((tool, idx) => (<Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">{renderToolCall(tool)}</Badge>))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {chatState.streamingMessage && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl max-w-[80%]">
                <div className="flex items-center gap-2 mb-1"><Bot className="w-4 h-4" /><span className="text-xs opacity-70"><Clock className="w-3 h-3 inline mr-1" />Now</span></div>
                <p className="whitespace-pre-wrap">{chatState.streamingMessage}<span className="animate-pulse">|</span></p>
              </div>
            </div>
          )}
          {(isLoading || chatState.isProcessing) && !chatState.streamingMessage && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl">
                <div className="flex items-center gap-2 mb-1"><Bot className="w-4 h-4" /><span className="text-xs opacity-70">Thinking...</span></div>
                <div className="flex space-x-1">{[0, 1, 2].map(i => (<div key={i} className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />))}</div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the AI Concierge..."
            className="flex-1 min-h-[42px] max-h-32 resize-none leading-tight py-3 bg-zinc-950/50 border-white/20 focus-visible:ring-primary"
            rows={1}
            disabled={isLoading || chatState.isProcessing}
          />
          <Button type="submit" disabled={!input.trim() || isLoading || chatState.isProcessing}><Send className="w-4 h-4" /></Button>
        </div>
      </form>
    </div>
  );
}