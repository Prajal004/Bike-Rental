import React, { useState } from 'react';

export const DocumentUpload = ({ label, onUpload, type }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploading(true);
      setTimeout(() => {
        onUpload(selectedFile);
        setUploading(false);
      }, 1000);
    }
  };

  return (
    <div className="document-upload">
      <label>{label}</label>
      <div className="upload-area">
        <input type="file" onChange={handleFileChange} accept="image/*,.pdf" />
        {file ? (
          <div className="file-info">
            <span>📄 {file.name}</span>
            {uploading ? <span className="uploading">Uploading...</span> : <span className="uploaded">✅ Uploaded</span>}
          </div>
        ) : (
          <p>Tap to upload {type || 'document'}</p>
        )}
      </div>
    </div>
  );
};