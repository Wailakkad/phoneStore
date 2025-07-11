'use client'
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  apiKey: string;
  siteUrl?: string;
  siteName?: string;
}

const AIChat: React.FC<AIChatProps> = ({ apiKey, siteUrl = '', siteName = 'BadarPhone' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you with BadarPhone products today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": siteUrl,
          "X-Title": siteName,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528:free",
          "messages": [
            {
              "role": "system",
              "content": "You are a helpful AI assistant for BadarPhone, a premium smartphone retailer. Help customers with product information, recommendations, and general inquiries. Be friendly and professional."
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: inputValue
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0]?.message?.content || 'Sorry, I couldn\'t process your request.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.5rem); }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(1.25rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
        }
        
        .chat-toggle-button {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 50;
          display: ${isOpen ? 'none' : 'block'};
        }
        
        .chat-toggle-button .bg-blur {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, #000000, #333333, #000000);
          border-radius: 1rem;
          filter: blur(12px);
          opacity: 0.8;
          transition: opacity 0.3s ease;
          animation: pulse 2s infinite;
        }
        
        .chat-toggle-button:hover .bg-blur {
          opacity: 1;
          animation: glow 2s infinite;
        }
        
        .chat-toggle-main {
          position: relative;
          background: linear-gradient(45deg, #000000, #333333, #000000);
          padding: 1rem;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .chat-toggle-main:hover {
          transform: scale(1.05);
          box-shadow: 0 25px 50px -12px rgba(255, 255, 255, 0.4);
        }
        
        .chat-toggle-main:active {
          transform: scale(0.95);
        }
        
        .chat-toggle-content {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        
        .status-indicator {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          width: 0.75rem;
          height: 0.75rem;
          background-color: #ffffff;
          border-radius: 50%;
          animation: ping 1s infinite;
        }
        
        .status-indicator-static {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          width: 0.75rem;
          height: 0.75rem;
          background-color: #ffffff;
          border-radius: 50%;
        }
        
        .chat-window {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 50;
          width: 20rem;
          height: 31.25rem;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(24px);
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: slideInFromBottom 0.3s ease-out;
        }
        
        .chat-window::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
          pointer-events: none;
        }
        
        .chat-header {
          position: relative;
          background: linear-gradient(45deg, #000000, #333333, #000000);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .chat-header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .chat-header-avatar {
          position: relative;
          width: 2rem;
          height: 2rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .chat-header-avatar .status {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          width: 0.75rem;
          height: 0.75rem;
          background-color: #ffffff;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        .chat-header-text h3 {
          font-weight: 600;
          font-size: 1.125rem;
          margin: 0;
          color: #ffffff;
        }
        
        .chat-header-text p {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }
        
        .chat-close-button {
          background: none;
          border: none;
          color: #ffffff;
          padding: 0.5rem;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .chat-close-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(90deg);
        }
        
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .message-container {
          display: flex;
          animation: fadeIn 0.2s ease-out;
        }
        
        .message-container.user {
          justify-content: flex-end;
        }
        
        .message-container.assistant {
          justify-content: flex-start;
        }
        
        .message-bubble {
          max-width: 85%;
          padding: 1rem;
          border-radius: 1rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .message-bubble:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          transform: translateY(-1px);
        }
        
        .message-bubble.user {
          background: linear-gradient(45deg, #333333, #000000);
          color: #ffffff;
          border-bottom-right-radius: 0.375rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .message-bubble.assistant {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          color: #000000;
          border-bottom-left-radius: 0.375rem;
          border: 1px solid rgba(0, 0, 0, 0.3);
        }
        
        .message-content {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .message-avatar {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.25rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .message-avatar.user {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }
        
        .message-avatar.assistant {
          background: linear-gradient(45deg, #333333, #000000);
          color: #ffffff;
        }
        
        .message-text {
          flex: 1;
        }
        
        .message-text p {
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0;
        }
        
        .message-time {
          font-size: 0.75rem;
          margin-top: 0.5rem;
        }
        
        .message-time.user {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .message-time.assistant {
          color: rgba(0, 0, 0, 0.6);
        }
        
        .loading-indicator {
          display: flex;
          justify-content: flex-start;
          animation: fadeIn 0.2s ease-out;
        }
        
        .loading-bubble {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          padding: 1rem;
          border-radius: 1rem;
          border-bottom-left-radius: 0.375rem;
          border: 1px solid rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .loading-avatar {
          width: 1.5rem;
          height: 1.5rem;
          background: linear-gradient(45deg, #333333, #000000);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .loading-dots {
          display: flex;
          gap: 0.25rem;
        }
        
        .loading-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }
        
        .loading-dot:nth-child(1) {
          background-color: #000000;
        }
        
        .loading-dot:nth-child(2) {
          background-color: #333333;
          animation-delay: 0.1s;
        }
        
        .loading-dot:nth-child(3) {
          background-color: #000000;
          animation-delay: 0.2s;
        }
        
        .chat-input-container {
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(8px);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .chat-input-wrapper {
          display: flex;
          gap: 0.75rem;
        }
        
        .chat-input-field {
          flex: 1;
          position: relative;
        }
        
        .chat-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 0, 0, 0.4);
          border-radius: 1rem;
          outline: none;
          font-size: 0.875rem;
          color: #000000;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        .chat-input:focus {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.9);
        }
        
        .chat-input:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          border-color: rgba(0, 0, 0, 0.6);
        }
        
        .chat-input::placeholder {
          color: rgba(0, 0, 0, 0.6);
        }
        
        .chat-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .chat-input-overlay {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.03));
          pointer-events: none;
        }
        
        .chat-send-button {
          background: linear-gradient(45deg, #000000, #333333);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.75rem;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }
        
        .chat-send-button:hover:not(:disabled) {
          background: linear-gradient(45deg, #333333, #000000);
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
        }
        
        .chat-send-button:active:not(:disabled) {
          transform: scale(0.95);
        }
        
        .chat-send-button:disabled {
          background: linear-gradient(45deg, #666666, #333333);
          border-color: rgba(255, 255, 255, 0.2);
          cursor: not-allowed;
        }
        
        .chat-send-button:disabled:hover {
          transform: none;
        }
        
        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 2rem);
            height: 70vh;
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
          }
          
          .chat-toggle-button {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="chat-toggle-button"
        aria-label="Open AI Chat"
      >
        <div>
          <div className="bg-blur"></div>
          <div className="chat-toggle-main">
            <div className="chat-toggle-content">
              <MessageCircle size={24} />
              <div className="status-indicator"></div>
              <div className="status-indicator-static"></div>
            </div>
          </div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-header-avatar">
                <Bot size={18} />
                <div className="status"></div>
              </div>
              <div className="chat-header-text">
                <h3>AI Assistant</h3>
                <p>Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chat-close-button"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-container ${message.role}`}
              >
                <div className={`message-bubble ${message.role}`}>
                  <div className="message-content">
                    <div className={`message-avatar ${message.role}`}>
                      {message.role === 'assistant' ? (
                        <Sparkles size={12} />
                      ) : (
                        <User size={12} />
                      )}
                    </div>
                    <div className="message-text">
                      <p>{message.content}</p>
                      <p className={`message-time ${message.role}`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="loading-indicator">
                <div className="loading-bubble">
                  <div className="loading-avatar">
                    <Sparkles size={12} />
                  </div>
                  <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <div className="chat-input-field">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="chat-input"
                  disabled={isLoading}
                />
                <div className="chat-input-overlay"></div>
              </div>
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="chat-send-button"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;