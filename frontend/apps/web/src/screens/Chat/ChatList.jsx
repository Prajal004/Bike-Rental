import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chatAPI } from '../../api/chat';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await chatAPI.getAll();
      if (response.success) {
        setChats(response.chats || []);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading chats...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>💬 Chats</h2>

      {chats.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          <p>No chats yet</p>
          <p style={{ fontSize: '14px' }}>Start a conversation with a shop owner</p>
        </div>
      ) : (
        chats.map((chat) => {
          const otherUser = chat.participant1 === localStorage.getItem('userId')
            ? chat.user2 : chat.user1;

          return (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}/${otherUser?.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                padding: '14px 16px',
                background: 'white',
                borderRadius: '12px',
                marginBottom: '8px',
                border: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: '0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              }}>
                <div>
                  <strong>{otherUser?.fullName || 'User'}</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#888' }}>
                    {chat.lastMessage || 'No messages yet'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>
                    {chat.lastMessageAt ? new Date(chat.lastMessageAt).toLocaleDateString() : ''}
                  </span>
                  {(chat.unreadCount1 > 0 || chat.unreadCount2 > 0) && (
                    <span style={{
                      display: 'block',
                      marginTop: '4px',
                      padding: '2px 8px',
                      background: '#E53935',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}>
                      {chat.unreadCount1 || chat.unreadCount2}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ChatList;
