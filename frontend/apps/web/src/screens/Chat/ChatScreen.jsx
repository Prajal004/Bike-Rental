import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { chatAPI } from '../../api/chat';
import { io } from 'socket.io-client';

const ChatScreen = () => {
  const { chatId, userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

  // ✅ Connect WebSocket
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    if (chatId) {
      newSocket.emit('join-chat', chatId);
    }

    return () => newSocket.close();
  }, [chatId]);

  // ✅ Load messages
  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  // ✅ Socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('new-message', (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    socket.on('user-typing', (data) => {
      // Show typing indicator
    });

    return () => {
      socket.off('new-message');
      socket.off('user-typing');
    };
  }, [socket]);

  const fetchMessages = async () => {
    try {
      const response = await chatAPI.getMessages(chatId);
      if (response.success) {
        setMessages(response.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await chatAPI.send({
        chatId,
        receiverId: userId,
        message: newMessage,
      });

      if (response.success) {
        setMessages((prev) => [...prev, response.message]);
        setNewMessage('');

        // Emit via socket
        if (socket) {
          socket.emit('send-message', {
            chatId,
            message: response.message,
          });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', { chatId });
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading messages...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
          ←
        </button>
        <h3 style={{ margin: 0 }}>💬 Chat</h3>
        <div style={{ width: '40px' }} />
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '12px',
        marginBottom: '12px',
        maxHeight: 'calc(80vh - 140px)',
      }}>
        {messages.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No messages yet. Start chatting!</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.senderId === userId ? 'flex-end' : 'flex-start',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: msg.senderId === userId ? '#4CAF50' : 'white',
                  color: msg.senderId === userId ? 'white' : '#333',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
              >
                <p style={{ margin: 0 }}>{msg.message}</p>
                <p style={{ margin: '4px 0 0', fontSize: '10px', opacity: 0.7 }}>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleTyping}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '2px solid #ddd',
            borderRadius: '24px',
            fontSize: '16px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '24px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
