'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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

function getMessageKey(sessionId: string, message: ChatMessage) {
  return message._id || `${sessionId}-${message.createdAt}-${message.text}`;
}

export default function AdminChatNotifier() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const [unreadCount, setUnreadCount] = useState(0);
  const seenVisitorMessages = useRef(new Set<string>());
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!isAdminPage) {
      return;
    }

    const fetchChats = async () => {
      try {
        const res = await fetch('/api/admin/chats');
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (!data.success) {
          return;
        }

        let newMessages = 0;
        for (const session of data.data as ChatSession[]) {
          for (const message of session.messages) {
            if (message.sender !== 'visitor') {
              continue;
            }

            const key = getMessageKey(session._id, message);
            if (!seenVisitorMessages.current.has(key)) {
              if (hasLoaded.current) {
                newMessages += 1;
              }
              seenVisitorMessages.current.add(key);
            }
          }
        }

        if (newMessages > 0) {
          setUnreadCount((count) => count + newMessages);
        }

        hasLoaded.current = true;
      } catch (error) {
        console.error('Admin chat notification failed:', error);
      }
    };

    fetchChats();
    const interval = window.setInterval(fetchChats, 5000);

    return () => window.clearInterval(interval);
  }, [isAdminPage]);

  useEffect(() => {
    if (pathname === '/admin/chats') {
      setUnreadCount(0);
    }
  }, [pathname]);

  if (!isAdminPage || pathname === '/admin/chats') {
    return null;
  }

  return (
    <Link className="admin-chat-notifier" href="/admin/chats" onClick={() => setUnreadCount(0)}>
      <i className="fa-solid fa-comments"></i>
      Chats
      {unreadCount > 0 && (
        <span className="admin-chat-count" aria-label={`${unreadCount} unread customer messages`}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}

      <style jsx>{`
        .admin-chat-notifier {
          align-items: center;
          background: #ef4444;
          border-radius: 999px;
          bottom: 22px;
          box-shadow: 0 14px 30px rgba(239, 68, 68, 0.34);
          color: #ffffff;
          display: inline-flex;
          font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 14px;
          font-weight: 900;
          gap: 8px;
          padding: 14px 18px;
          position: fixed;
          right: 22px;
          text-decoration: none;
          text-transform: uppercase;
          z-index: 1200;
        }

        .admin-chat-count {
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

        @media (max-width: 575px) {
          .admin-chat-notifier {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
    </Link>
  );
}
