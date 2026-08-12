import React, { useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      bike: 'Honda CB Shine', 
      date: '2026-08-12', 
      returnDate: '2026-08-15',
      amount: 350, 
      status: 'Ongoing', 
      pickupOption: 'shop',
      returnOption: 'shop',
      details: 'Pickup: Shop, Return: Shop',
      returnAddress: '',
      flexibleReturn: true,
    },
    { 
      id: 2, 
      bike: 'Yamaha FZ', 
      date: '2026-08-10', 
      returnDate: '2026-08-13',
      amount: 400, 
      status: 'Completed', 
      pickupOption: 'delivery',
      returnOption: 'pickup',
      details: 'Pickup: Delivery, Return: Pickup',
      returnAddress: 'Thamel, Kathmandu',
      flexibleReturn: false,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReturnOptions, setShowReturnOptions] = useState(false);
  const [returnAddress, setReturnAddress] = useState('');
  const [newReturnOption, setNewReturnOption] = useState('shop');
  const [newReturnDate, setNewReturnDate] = useState('');

  const handleCancel = (id) => {
    if (window.confirm('Cancel this order?')) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
      alert('✅ Order cancelled!');
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setReturnAddress(order.returnAddress || '');
    setNewReturnOption(order.returnOption || 'shop');
    setNewReturnDate(order.returnDate || '');
  };

  // ✅ Update Return Option
  const handleUpdateReturn = (id) => {
    if (newReturnOption === 'pickup' && !returnAddress.trim()) {
      alert('Please enter address for pickup');
      return;
    }
    
    setOrders(orders.map(o => 
      o.id === id ? { 
        ...o, 
        returnOption: newReturnOption,
        returnAddress: returnAddress,
        returnDate: newReturnDate || o.returnDate,
        details: `Pickup: ${o.pickupOption === 'shop' ? 'Shop' : 'Delivery'}, Return: ${newReturnOption === 'shop' ? 'Shop' : 'Pickup'}`
      } : o
    ));
    
    setShowReturnOptions(false);
    setSelectedOrder(null);
    alert('✅ Return option updated successfully!');
  };

  // ✅ Update Return Date Only
  const handleUpdateReturnDate = (id) => {
    if (!newReturnDate) {
      alert('Please select a new return date');
      return;
    }
    
    setOrders(orders.map(o => 
      o.id === id ? { ...o, returnDate: newReturnDate } : o
    ));
    
    setShowReturnOptions(false);
    setSelectedOrder(null);
    alert('✅ Return date updated successfully!');
  };

  const getReturnLabel = (option) => {
    return option === 'shop' ? '🏪 Return to Shop' : '🚚 Pickup from Location';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>📋 My Orders</h2>

      {selectedOrder && (
        <div style={{
          background: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '1px solid #ddd',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>📄 Order Details</h3>
            <button
              onClick={() => { setSelectedOrder(null); setShowReturnOptions(false); }}
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          <p><strong>Bike:</strong> {selectedOrder.bike}</p>
          <p><strong>Pickup Date:</strong> {formatDate(selectedOrder.date)}</p>
          <p><strong>Return Date:</strong> {formatDate(selectedOrder.returnDate)}</p>
          <p><strong>Amount:</strong> Rs {selectedOrder.amount}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Pickup:</strong> {selectedOrder.pickupOption === 'shop' ? '🏪 Shop' : '🚚 Delivery'}</p>
          <p><strong>Return:</strong> {getReturnLabel(selectedOrder.returnOption)}</p>
          
          {/* ✅ Change Return Date Button */}
          {selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && selectedOrder.flexibleReturn && (
            <div style={{ marginTop: '10px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>📅 Change Return Date</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="date"
                  value={newReturnDate}
                  onChange={(e) => setNewReturnDate(e.target.value)}
                  style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <button
                  onClick={() => handleUpdateReturnDate(selectedOrder.id)}
                  style={{
                    padding: '8px 16px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Update Date
                </button>
              </div>
            </div>
          )}

          {/* ✅ Change Return Option Button */}
          {selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
            <button
              onClick={() => setShowReturnOptions(!showReturnOptions)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                background: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔄 Change Return Option
            </button>
          )}

          {showReturnOptions && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Update Return Option</h4>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <button
                  onClick={() => setNewReturnOption('shop')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: newReturnOption === 'shop' ? '#4CAF50' : '#f5f5f5',
                    color: newReturnOption === 'shop' ? 'white' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  🏪 Return to Shop
                </button>
                <button
                  onClick={() => setNewReturnOption('pickup')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: newReturnOption === 'pickup' ? '#4CAF50' : '#f5f5f5',
                    color: newReturnOption === 'pickup' ? 'white' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  🚚 Pickup from Location
                </button>
              </div>

              {newReturnOption === 'pickup' && (
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>📍 Pickup Address *</label>
                  <input
                    type="text"
                    placeholder="Enter address for bike pickup"
                    value={returnAddress}
                    onChange={(e) => setReturnAddress(e.target.value)}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              )}

              <button
                onClick={() => handleUpdateReturn(selectedOrder.id)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Update Return Option
              </button>
            </div>
          )}

          {selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
            <button
              onClick={() => handleCancel(selectedOrder.id)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                background: '#E53935',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ❌ Cancel Order
            </button>
          )}
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            background: 'white',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '12px',
            border: '1px solid #eee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{order.bike}</h4>
              <p style={{ margin: '4px 0', color: '#888', fontSize: '14px' }}>
                {formatDate(order.date)} → {formatDate(order.returnDate)}
              </p>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#666' }}>
                Return: {getReturnLabel(order.returnOption)}
              </p>
              {order.flexibleReturn && (
                <span style={{ fontSize: '11px', color: '#FF9800' }}>
                  📅 Flexible return (can change date)
                </span>
              )}
              <span style={{
                marginLeft: '8px',
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                background: order.status === 'Completed' ? '#dcfce7' :
                          order.status === 'Ongoing' ? '#dbeafe' :
                          order.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                color: order.status === 'Completed' ? '#166534' :
                       order.status === 'Ongoing' ? '#1e40af' :
                       order.status === 'Pending' ? '#92400e' : '#991b1b',
              }}>
                {order.status}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <button
                onClick={() => handleViewDetails(order)}
                style={{
                  padding: '4px 12px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                👁️ View
              </button>
              {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                <button
                  onClick={() => handleCancel(order.id)}
                  style={{
                    padding: '4px 12px',
                    background: '#E53935',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
