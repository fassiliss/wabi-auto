'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ChatMessage = {
  _id?: string;
  sender: 'visitor' | 'admin';
  text: string;
  createdAt: string;
};

type ChatSession = {
  _id: string;
  status: 'open' | 'closed';
  messages: ChatMessage[];
  lastMessageAt: string;
  createdAt: string;
};

export default function AdminChatsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const selectedChat = useMemo(
    () => sessions.find((session) => session._id === selectedId) || sessions[0],
    [selectedId, sessions],
  );

  const fetchChats = async () => {
    try {
      const res = await fetch('/api/admin/chats');
      if (res.status === 401) {
        localStorage.removeItem('adminAuth');
        router.push('/admin');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setSessions(data.data);
        setSelectedId((current) => current || data.data[0]?._id || '');
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }

    fetchChats();
    const interval = window.setInterval(fetchChats, 5000);

    return () => window.clearInterval(interval);
  }, [router]);

  const sendReply = async (event: FormEvent) => {
    event.preventDefault();
    const text = reply.trim();

    if (!selectedChat || !text || sending) {
      return;
    }

    setSending(true);
    setReply('');

    try {
      const res = await fetch(`/api/admin/chats/${selectedChat._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, status: 'open' }),
      });

      if (res.ok) {
        fetchChats();
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setSending(false);
    }
  };

  const updateStatus = async (status: 'open' | 'closed') => {
    if (!selectedChat) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/chats/${selectedChat._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchChats();
      }
    } catch (error) {
      console.error('Error updating chat:', error);
    }
  };

  const deleteChat = async () => {
    if (!selectedChat || !confirm('Delete this chat conversation?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/chats/${selectedChat._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSelectedId('');
        fetchChats();
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading chats...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', padding: '160px 20px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          alignItems: 'center',
          background: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'space-between',
          marginBottom: '20px',
          padding: '22px 24px',
        }}>
          <div>
            <h1 style={{ margin: 0, color: '#111827', fontWeight: 900 }}>Website Chats</h1>
            <p style={{ margin: '6px 0 0', color: '#6b7280' }}>Reply to visitors from the site chat box.</p>
          </div>
          <Link href="/admin/dashboard" style={buttonStyle('#6b7280')}>Dashboard</Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 340px) 1fr',
          gap: '20px',
        }}>
          <div style={panelStyle}>
            <h2 style={sectionTitleStyle}>Conversations</h2>
            {sessions.length === 0 ? (
              <p style={{ color: '#6b7280', margin: 0 }}>No chats yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '10px' }}>
                {sessions.map((session) => {
                  const lastMessage = session.messages.at(-1);
                  const active = selectedChat?._id === session._id;

                  return (
                    <button
                      key={session._id}
                      type="button"
                      onClick={() => setSelectedId(session._id)}
                      style={{
                        background: active ? '#111827' : '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: active ? '#ffffff' : '#111827',
                        cursor: 'pointer',
                        padding: '12px',
                        textAlign: 'left',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '14px' }}>
                        Visitor Chat
                      </strong>
                      <span style={{ display: 'block', fontSize: '12px', marginTop: '4px', opacity: 0.72 }}>
                        {lastMessage?.text || 'No message'}
                      </span>
                      <span style={{ display: 'block', fontSize: '11px', marginTop: '6px', textTransform: 'uppercase', fontWeight: 900 }}>
                        {session.status} · {new Date(session.lastMessageAt).toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div style={panelStyle}>
            {selectedChat ? (
              <>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ ...sectionTitleStyle, marginBottom: '4px' }}>Conversation</h2>
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '13px' }}>
                      Started {new Date(selectedChat.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => updateStatus(selectedChat.status === 'open' ? 'closed' : 'open')}
                      style={buttonStyle(selectedChat.status === 'open' ? '#ef4444' : '#10b981')}
                    >
                      {selectedChat.status === 'open' ? 'Close' : 'Reopen'}
                    </button>
                    <button type="button" onClick={deleteChat} style={buttonStyle('#991b1b')}>
                      Delete
                    </button>
                  </div>
                </div>

                <div style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  height: '440px',
                  overflowY: 'auto',
                  padding: '16px',
                }}>
                  {selectedChat.messages.map((message, index) => (
                    <div
                      key={message._id || `${message.sender}-${index}`}
                      style={{
                        alignSelf: message.sender === 'admin' ? 'flex-end' : 'flex-start',
                        background: message.sender === 'admin' ? '#111827' : '#ffffff',
                        border: message.sender === 'admin' ? '0' : '1px solid #e5e7eb',
                        borderRadius: '10px',
                        color: message.sender === 'admin' ? '#ffffff' : '#111827',
                        maxWidth: '78%',
                        padding: '10px 12px',
                      }}
                    >
                      <div style={{ fontSize: '14px', lineHeight: 1.45 }}>{message.text}</div>
                      <div style={{ fontSize: '11px', marginTop: '5px', opacity: 0.68 }}>
                        {message.sender === 'admin' ? 'You' : 'Visitor'} · {new Date(message.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={sendReply} style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                  <input
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Write your reply..."
                    style={{
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      flex: 1,
                      fontSize: '15px',
                      padding: '12px 14px',
                    }}
                  />
                  <button type="submit" disabled={sending || !reply.trim()} style={buttonStyle('#2563eb')}>
                    Send
                  </button>
                </form>
              </>
            ) : (
              <p style={{ color: '#6b7280', margin: 0 }}>Select a chat to reply.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const panelStyle = {
  background: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  padding: '20px',
} as const;

const sectionTitleStyle = {
  color: '#111827',
  fontSize: '20px',
  fontWeight: 900,
  margin: '0 0 14px',
} as const;

function buttonStyle(background: string) {
  return {
    background,
    border: '0',
    borderRadius: '8px',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: 900,
    padding: '11px 16px',
    textDecoration: 'none',
  } as const;
}
