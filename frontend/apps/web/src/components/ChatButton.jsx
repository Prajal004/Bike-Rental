import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatAPI } from '../api/chat';

const ChatButton = ({ shopOwnerId, shopName }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStartChat = async () => {
    setLoading(true);
    try {
      const response = await chatAPI.getOrCreate(shopOwnerId);
      if (response.success) {
        navigate(`/chat/${response.chat.id}/${shopOwnerId}`);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      alert('Could not start chat. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleStartChat}
      disabled={loading}
      style={{
        padding: '10px 20px',
        background: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: loading ? 0.7 : 1,
      }}
    >
      💬 {loading ? 'Connecting...' : `Chat with ${shopName || 'Shop'}`}
    </button>
  );
};

export default ChatButton;
