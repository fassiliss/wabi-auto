'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

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
const LAST_SEEN_ADMIN_KEY = 'wabiLastSeenAdminMessage';
const GREETING: ChatMessage = {
  sender: 'admin',
  text: 'Hi What can i help you',
};

function getMessageKey(message: ChatMessage) {
  return message._id || `${message.createdAt}-${message.text}`;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const knownAdminMessages = useRef(new Set<string>());
  const hasLoadedSession = useRef(false);
  const [unreadAdminReplies, setUnreadAdminReplies] = useState(0);

  useEffect(() => {
    if (isAdminPage) {
      return;
    }

    const savedSessionId = localStorage.getItem(STORAGE_KEY) || '';
    setSessionId(savedSessionId);
  }, [isAdminPage]);

  useEffect(() => {
    if (isAdminPage || !sessionId) {
      return;
    }

    const loadChat = async () => {
      try {
        const res = await fetch(`/api/chat?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success && data.data) {
          const sessionMessages = data.data.messages as ChatMessage[];
          const latestAdminMessage = [...sessionMessages].reverse().find((item) => item.sender === 'admin');
          const latestAdminMessageKey = latestAdminMessage ? getMessageKey(latestAdminMessage) : '';
          const lastSeenAdminMessage = localStorage.getItem(`${LAST_SEEN_ADMIN_KEY}:${sessionId}`) || '';
          const hasUnreadAdminReply = Boolean(latestAdminMessageKey && latestAdminMessageKey !== lastSeenAdminMessage);

          for (const item of sessionMessages) {
            if (item.sender === 'admin') {
              knownAdminMessages.current.add(getMessageKey(item));
            }
          }

          if (hasUnreadAdminReply && !isOpen) {
            if (document.visibilityState === 'visible') {
              setIsOpen(true);
              localStorage.setItem(`${LAST_SEEN_ADMIN_KEY}:${sessionId}`, latestAdminMessageKey);
              setUnreadAdminReplies(0);
            } else {
              setUnreadAdminReplies(1);
            }
          }

          hasLoadedSession.current = true;
          setMessages([GREETING, ...data.data.messages]);
        }
      } catch (error) {
        console.error('Chat load failed:', error);
      }
    };

    loadChat();
    const interval = window.setInterval(loadChat, 5000);

    return () => window.clearInterval(interval);
  }, [isAdminPage, isOpen, sessionId]);

  useEffect(() => {
    if (isOpen) {
      setUnreadAdminReplies(0);
      const latestAdminMessage = [...messages].reverse().find((item) => item.sender === 'admin');
      if (sessionId && latestAdminMessage) {
        localStorage.setItem(`${LAST_SEEN_ADMIN_KEY}:${sessionId}`, getMessageKey(latestAdminMessage));
      }
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const text = message.trim();

    if (!text || sending) {
      return;
    }

    setSending(true);
    setError('');
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
        hasLoadedSession.current = true;
      } else {
        setMessage(text);
        setError(data.error || 'Message could not send. Please try again.');
      }
    } catch (error) {
      console.error('Chat send failed:', error);
      setMessage(text);
      setError('Message could not send. Check your connection or call us.');
      setMessages((current) => [
        ...current,
        { sender: 'admin', text: 'Message could not send. Please try again or call us.' },
      ]);
    } finally {
      setSending(false);
    }
  };

  if (isAdminPage) {
    return null;
  }

  const clearChat = async () => {
    if (sessionId) {
      await fetch(`/api/chat?sessionId=${sessionId}`, { method: 'DELETE' }).catch(() => null);
    }

    localStorage.removeItem(STORAGE_KEY);
    setSessionId('');
    setMessages([GREETING]);
    setUnreadAdminReplies(0);
    knownAdminMessages.current.clear();
    hasLoadedSession.current = false;
    setIsOpen(false);
  };

  const toggleChat = () => {
    setIsOpen((value) => {
      if (!value) {
        setUnreadAdminReplies(0);
      }

      return !value;
    });
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
            {error && <div className="chat-error">{error}</div>}
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

      <button className="chat-toggle" type="button" onClick={toggleChat}>
        <i className="fa-solid fa-comments"></i>
        Chat
        {unreadAdminReplies > 0 && (
          <span className="chat-unread" aria-label={`${unreadAdminReplies} unread chat replies`}>
            {unreadAdminReplies > 9 ? '9+' : unreadAdminReplies}
          </span>
        )}
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
          position: relative;
        }

        .chat-unread {
          align-items: center;
          background: #111827;
          border: 2px solid #ffffff;
          border-radius: 999px;
          color: #ffffff;
          display: inline-flex;
          font-size: 11px;
          font-weight: 950;
          height: 22px;
          justify-content: center;
          min-width: 22px;
          padding: 0 6px;
          position: absolute;
          right: -7px;
          top: -8px;
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
          display: grid;
          gap: 8px;
          grid-template-columns: 1fr auto;
          padding: 12px;
        }

        .chat-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #991b1b;
          font-size: 12px;
          grid-column: 1 / -1;
          padding: 8px 10px;
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
