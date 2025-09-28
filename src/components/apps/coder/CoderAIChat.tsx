import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Code, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { chatService } from '@/lib/chat';
import type { ChatState, Message } from '../../../../worker/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
interface CoderAIChatProps {
  codeContext: string;
  onInsertCode: (code: string) => void;
}
export function CoderAIChat({ codeContext, onInsertCode }: CoderAIChatProps) {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    sessionId: chatService.getSessionId(),
    isProcessing: false,
    model: 'openai/gpt-4o',
    streamingMessage: ''
  });
  const [input, setInput] = useState('');
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
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      timestamp: Date.now()
    };
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      streamingMessage: '',
      isProcessing: true,
    }));
    await chatService.sendMessage(message, chatState.model, (chunk) => {
      setChatState(prev => ({
        ...prev,
        streamingMessage: (prev.streamingMessage || '') + chunk
      }));
    }, codeContext);
    const response = await chatService.getMessages();
    if (response.success && response.data) {
      setChatState(response.data);
    }
    setChatState(prev => ({ ...prev, isProcessing: false, streamingMessage: '' }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
    setInput('');
  };
  const handleAiAction = (prompt: string) => {
    handleSendMessage(prompt);
  };
  return (
    <div className="h-full flex flex-col p-2">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="font-semibold text-lg flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> AI Coder</h3>
        <div className="flex gap-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => handleAiAction("Explain this code.")}><Code className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Explain Code</p></TooltipContent></Tooltip>
            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => handleAiAction("Refactor this code for clarity and efficiency.")}><Wand2 className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent><p>Refactor Code</p></TooltipContent></Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <ScrollArea className="flex-1 bg-zinc-950/50 rounded-md border border-white/20 mb-2" ref={scrollAreaRef}>
        <div className="p-2 space-y-3">
          {chatState.messages.map((msg) => (
            <div key={msg.id} className={cn('flex items-start gap-2', msg.role === 'user' ? 'justify-end' : '')}>
              {msg.role === 'assistant' && <Bot className="w-5 h-5 text-primary flex-shrink-0" />}
              <div className={cn('max-w-[90%] p-2 rounded-lg text-sm', msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-zinc-800')}>
                <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
              </div>
              {msg.role === 'user' && <User className="w-5 h-5 flex-shrink-0" />}
            </div>
          ))}
          {chatState.streamingMessage && (
            <div className="flex items-start gap-2">
              <Bot className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="max-w-[90%] p-2 rounded-lg text-sm bg-zinc-800">
                <pre className="whitespace-pre-wrap font-sans">{chatState.streamingMessage}<span className="animate-pulse">|</span></pre>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e); }}
          placeholder="Ask AI to write or change code..."
          className="flex-1 min-h-[40px] max-h-24 resize-none bg-zinc-950/50 border-white/20"
          rows={1}
          disabled={chatState.isProcessing}
        />
        <Button type="submit" size="icon" disabled={!input.trim() || chatState.isProcessing}><Send className="w-4 h-4" /></Button>
      </form>
    </div>
  );
}