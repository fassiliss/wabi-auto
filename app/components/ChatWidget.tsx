'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type ChatMessage = {
  _id?: string;
  sender: 'visitor' | 'admin';
  text: string;
  createdAt?: string;
};

type ChatSession = {
  _id: string;
  messages: ChatMessage[];
};

const STORAGE_KEY = 'wabiChatSessionId';
const GREETING: ChatMessage = {
  sender: 'admin',
  text: 'Hi What can i help you',
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedSessionId = localStorage.getItem(STORAGE_KEY) || '';
    setSessionId(savedSessionId);
  }, []);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const loadChat = async () => {
      try {
        const res = await fetch(`/api/chat?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setMessages([GREETING, ...data.data.messages]);
        }
      } catch (error) {
        console.error('Chat load failed:', error);
      }
    };

    loadChat();
    const interval = window.setInterval(loadChat, 5000);

    return () => window.clearInterval(interval);
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const text = message.trim();

    if (!text || sending) {
      return;
    }

    setSending(true);
    setMessage('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, text }),
      });
      const data: { success: boolean; data?: ChatSession; error?: string } = await res.json();

      if (data.success && data.data) {
        localStorage.setItem(STORAGE_KEY, data.data._id);
        setSessionId(data.data._id);
        setMessages([GREETING, ...data.data.messages]);
      }
    } catch (error) {
      console.error('Chat send failed:', error);
      setMessages((current) => [
        ...current,
        { sender: 'admin', text: 'Message could not send. Please try again or call us.' },
      ]);
    } finally {
      setSending(false);
    }
  };

  const clearChat = async () => {
    if (sessionId) {
      await fetch(`/api/chat?sessionId=${sessionId}`, { method: 'DELETE' }).catch(() => null);
    }

    localStorage.removeItem(STORAGE_KEY);
    setSessionId('');
    setMessages([GREETING]);
    setIsOpen(false);
  };

  return (
    <div className="chat-widget" aria-live="polite">
      {isOpen && (
        <div className="chat-backdrop" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      {isOpen && (
        <div className="chat-panel" onClick={(event) => event.stopPropagation()}>
          <div className="chat-header">
            <div>
              <strong>Wabi Auto</strong>
              <span>Usually replies soon</span>
            </div>
            <div className="chat-header-actions">
              <button type="button" onClick={clearChat} aria-label="End chat">
                End
              </button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">
                ×
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((item, index) => (
              <div
                key={item._id || `${item.sender}-${index}`}
                className={`chat-bubble ${item.sender === 'visitor' ? 'visitor' : 'admin'}`}
              >
                {item.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form className="chat-form" onSubmit={sendMessage}>
            <input
              aria-label="Chat message"
              placeholder="Type your message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" disabled={sending || !message.trim()}>
              Send
            </button>
          </form>
        </div>
      )}

      <button className="chat-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        <i className="fa-solid fa-comments"></i>
        Chat
      </button>

      <style jsx>{`
        .chat-widget {
          bottom: 22px;
          position: fixed;
          right: 22px;
          z-index: 1200;
          font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .chat-toggle {
          align-items: center;
          background: #ef4444;
          border: 0;
          border-radius: 999px;
          box-shadow: 0 14px 30px rgba(239, 68, 68, 0.34);
          color: #ffffff;
          cursor: pointer;
          display: inline-flex;
          font-size: 14px;
          font-weight: 900;
          gap: 8px;
          padding: 14px 18px;
          text-transform: uppercase;
        }

        .chat-backdrop {
          inset: 0;
          position: fixed;
          z-index: -1;
        }

        .chat-panel {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          bottom: 66px;
          box-shadow: 0 24px 70px rgba(17, 24, 39, 0.22);
          overflow: hidden;
          position: absolute;
          right: 0;
          width: min(360px, calc(100vw - 32px));
        }

        .chat-header {
          align-items: center;
          background: #111827;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          padding: 14px 16px;
        }

        .chat-header strong,
        .chat-header span {
          display: block;
        }

        .chat-header strong {
          font-size: 15px;
          font-weight: 900;
        }

        .chat-header span {
          color: rgba(255, 255, 255, 0.72);
          font-size: 12px;
          margin-top: 2px;
        }

        .chat-header-actions {
          align-items: center;
          display: flex;
          gap: 8px;
        }

        .chat-header button {
          background: transparent;
          border: 0;
          color: #ffffff;
          cursor: pointer;
          font-size: 13px;
          font-weight: 900;
          line-height: 1;
        }

        .chat-header button:last-child {
          font-size: 28px;
          font-weight: 400;
        }

        .chat-messages {
          background: #f9fafb;
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: 320px;
          overflow-y: auto;
          padding: 14px;
        }

        .chat-bubble {
          border-radius: 10px;
          font-size: 14px;
          line-height: 1.45;
          max-width: 84%;
          padding: 10px 12px;
        }

        .chat-bubble.admin {
          align-self: flex-start;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          color: #111827;
        }

        .chat-bubble.visitor {
          align-self: flex-end;
          background: #ef4444;
          color: #ffffff;
        }

        .chat-form {
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
          padding: 12px;
        }

        .chat-form input {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          flex: 1;
          font-size: 14px;
          min-width: 0;
          padding: 11px 12px;
        }

        .chat-form button {
          background: #111827;
          border: 0;
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          font-size: 13px;
          font-weight: 900;
          padding: 0 14px;
          text-transform: uppercase;
        }

        .chat-form button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }

        @media (max-width: 575px) {
          .chat-widget {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
    </div>
  );
}
