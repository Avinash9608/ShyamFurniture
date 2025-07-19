"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { chat, type ChatInput } from '@/ai/flows/chatbot';
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'model';
    content: string;
}

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const chatInput: ChatInput = {
                history: messages,
                message: input,
            };
            const result = await chat(chatInput);
            const modelMessage: Message = { role: 'model', content: result.response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);


    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                     {messages.length === 0 && (
                        <div className="text-center text-muted-foreground p-8">
                            <Bot className="mx-auto h-12 w-12 mb-4" />
                            <h2 className="text-xl font-semibold">Shyam Furniture Support</h2>
                            <p>Ask me anything about our products or services!</p>
                        </div>
                    )}
                    {messages.map((message, index) => (
                        <div key={index} className={cn(
                            "flex items-start gap-3",
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}>
                            {message.role === 'model' && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "p-3 rounded-lg max-w-sm",
                                message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                            )}>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                             {message.role === 'user' && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            <div className="p-3 rounded-lg bg-muted">
                                <Loader2 className="h-5 w-5 animate-spin" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
