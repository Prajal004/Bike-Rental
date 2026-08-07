import React from 'react';

const DocumentViewer = ({ isOpen, onClose, document, title }) => {
  if (!isOpen) return null;

  // Document type detect garne
  const getFileType = (doc) => {
    if (!doc) return 'unknown';
    const ext = doc.split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
    if (['pdf'].includes(ext)) return 'pdf';
    if (['doc', 'docx'].includes(ext)) return 'word';
    if (['txt'].includes(ext)) return 'text';
    return 'unknown';
  };

  const fileType = getFileType(document);
  const isImage = fileType === 'image';
  const isPDF = fileType === 'pdf';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '24px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '20px' }}>
            📄 {title || document || 'Document'}
          </h3>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '28px', 
              cursor: 'pointer',
              padding: '4px 12px',
              borderRadius: '8px',
              transition: '0.2s',
            }}
            onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
          >
            ✕
          </button>
        </div>

        <div style={{
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '20px',
          minHeight: '250px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e9ecef',
        }}>
          {document ? (
            <>
              {/* File Icon */}
              <div style={{ fontSize: '64px', marginBottom: '12px' }}>
                {isImage ? '🖼️' : isPDF ? '📄' : '📎'}
              </div>
              
              {/* File Name */}
              <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '4px 0' }}>
                {document}
              </p>
              
              {/* File Type Badge */}
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                background: isImage ? '#dbeafe' : isPDF ? '#fee2e2' : '#f3f4f6',
                color: isImage ? '#1e40af' : isPDF ? '#991b1b' : '#4b5563',
                marginTop: '4px',
              }}>
                {isImage ? 'Image File' : isPDF ? 'PDF Document' : 'Document'}
              </span>

              {/* Image Preview */}
              {isImage && (
                <div style={{
                  marginTop: '16px',
                  width: '100%',
                  maxHeight: '300px',
                  background: '#fff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    color: '#888',
                  }}>
                    🖼️ Preview
                  </div>
                </div>
              )}

              {/* PDF Preview */}
              {isPDF && (
                <div style={{
                  marginTop: '16px',
                  width: '100%',
                  padding: '20px',
                  background: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  textAlign: 'center',
                }}>
                  <p style={{ color: '#666' }}>📄 PDF Document</p>
                  <p style={{ fontSize: '14px', color: '#999' }}>
                    Click download to view full document
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ 
                marginTop: '16px', 
                display: 'flex', 
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <button 
                  onClick={() => alert(`📂 Opening: ${document}`)}
                  style={{ 
                    padding: '10px 24px', 
                    background: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    transition: '0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#388E3C'}
                  onMouseLeave={(e) => e.target.style.background = '#4CAF50'}
                >
                  📂 View Document
                </button>
                <button 
                  onClick={() => alert(`⬇️ Downloading: ${document}`)}
                  style={{ 
                    padding: '10px 24px', 
                    background: '#2196F3', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    transition: '0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#1976D2'}
                  onMouseLeave={(e) => e.target.style.background = '#2196F3'}
                >
                  ⬇️ Download
                </button>
                <button 
                  onClick={onClose}
                  style={{ 
                    padding: '10px 24px', 
                    background: '#f0f0f0', 
                    color: '#333', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  ✕ Close
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '64px', marginBottom: '12px', opacity: 0.5 }}>📭</div>
              <p style={{ color: '#888' }}>No document uploaded</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
