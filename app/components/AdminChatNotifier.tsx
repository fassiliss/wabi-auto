'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

const LAST_OPENED_CHATS_KEY = 'wabiAdminLastOpenedChats';

export default function AdminChatNotifier() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const [unreadCount, setUnreadCount] = useState(0);

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

        const lastOpenedChats = Number(localStorage.getItem(LAST_OPENED_CHATS_KEY) || '0');
        let unreadMessages = 0;

        for (const session of data.data as ChatSession[]) {
          for (const message of session.messages) {
            if (message.sender !== 'visitor') {
              continue;
            }

            const messageTime = message.createdAt ? new Date(message.createdAt).getTime() : 0;
            if (!lastOpenedChats || messageTime > lastOpenedChats) {
              unreadMessages += 1;
            }
          }
        }

        setUnreadCount(unreadMessages);
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
      localStorage.setItem(LAST_OPENED_CHATS_KEY, String(Date.now()));
      setUnreadCount(0);
    }
  }, [pathname]);

  if (!isAdminPage || pathname === '/admin/chats') {
    return null;
  }

  return (
    <Link
      className="admin-chat-notifier"
      href="/admin/chats"
      onClick={() => {
        localStorage.setItem(LAST_OPENED_CHATS_KEY, String(Date.now()));
        setUnreadCount(0);
      }}
    >
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
          bottom: 32px;
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
            bottom: 22px;
            right: 16px;
          }
        }
      `}</style>
    </Link>
  );
}
