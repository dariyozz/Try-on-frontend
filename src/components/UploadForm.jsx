import React, { useState, useRef } from "react";
import { Camera, Upload, Sparkles, ArrowRight, RotateCcw, Download, Share2, Moon, Sun, Zap, Shield, Clock } from "lucide-react";

// Enhanced Upload Form Component
function UploadForm({ onSubmit, loading, setError }) {
  const personRef = useRef();
  const clothingRef = useRef();
  const [personPreview, setPersonPreview] = useState(null);
  const [clothingPreview, setClothingPreview] = useState(null);
  const [dragOver, setDragOver] = useState({ person: false, clothing: false });

  const MAX_SIZE = 5 * 1024 * 1024;
  const VALID_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  const validateFile = (file, label) => {
    if (!file) return false;
    if (!VALID_TYPES.includes(file.type)) {
      setError && setError(`${label} must be a JPG, PNG, or WEBP image.`);
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError && setError(`${label} must be less than 5MB.`);
      return false;
    }
    return true;
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragOver({ ...dragOver, [type]: false });
    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'person') {
        handlePersonFile(file);
      } else {
        handleClothingFile(file);
      }
    }
  };

  const handlePersonFile = (file) => {
    if (file && validateFile(file, "Your photo")) {
      setPersonPreview(URL.createObjectURL(file));
      setError && setError("");
      const dt = new DataTransfer();
      dt.items.add(file);
      personRef.current.files = dt.files;
    }
  };

  const handleClothingFile = (file) => {
    if (file && validateFile(file, "Clothing image")) {
      setClothingPreview(URL.createObjectURL(file));
      setError && setError("");
      const dt = new DataTransfer();
      dt.items.add(file);
      clothingRef.current.files = dt.files;
    }
  };

  const handlePersonChange = (e) => {
    const file = e.target.files[0];
    handlePersonFile(file);
  };

  const handleClothingChange = (e) => {
    const file = e.target.files[0];
    handleClothingFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personFile = personRef.current.files[0];
    const clothingFile = clothingRef.current.files[0];
    if (!personFile || !clothingFile) return;
    if (!validateFile(personFile, "Your photo") || !validateFile(clothingFile, "Clothing image")) return;
    setError && setError("");
    onSubmit(personFile, clothingFile);
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div className="upload-grid">
        <div
          className={`upload-zone ${dragOver.person ? 'drag-over' : ''} ${personPreview ? 'has-preview' : ''}`}
          onDrop={(e) => handleDrop(e, 'person')}
          onDragOver={(e) => { e.preventDefault(); setDragOver({...dragOver, person: true}); }}
          onDragLeave={() => setDragOver({...dragOver, person: false})}
          onClick={() => personRef.current?.click()}
        >
          {personPreview ? (
            <div className="preview-container">
              <img src={personPreview} alt="Person Preview" className="preview-img" />
              <div className="preview-overlay">
                <Camera size={24} />
                <span>Change Photo</span>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <Camera size={32} />
              <h3>Your Photo</h3>
              <p>Drop your photo here or click to browse</p>
              <span className="file-types">JPG, PNG, WEBP • Max 5MB</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={personRef}
            onChange={handlePersonChange}
            disabled={loading}
            required
            style={{ display: 'none' }}
          />
        </div>

        <div
          className={`upload-zone ${dragOver.clothing ? 'drag-over' : ''} ${clothingPreview ? 'has-preview' : ''}`}
          onDrop={(e) => handleDrop(e, 'clothing')}
          onDragOver={(e) => { e.preventDefault(); setDragOver({...dragOver, clothing: true}); }}
          onDragLeave={() => setDragOver({...dragOver, clothing: false})}
          onClick={() => clothingRef.current?.click()}
        >
          {clothingPreview ? (
            <div className="preview-container">
              <img src={clothingPreview} alt="Clothing Preview" className="preview-img" />
              <div className="preview-overlay">
                <Upload size={24} />
                <span>Change Clothing</span>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <Upload size={32} />
              <h3>Clothing Item</h3>
              <p>Drop clothing image here or click to browse</p>
              <span className="file-types">JPG, PNG, WEBP • Max 5MB</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={clothingRef}
            onChange={handleClothingChange}
            disabled={loading}
            required
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <button type="submit" className="try-on-btn" disabled={loading || !personPreview || !clothingPreview}>
        {loading ? (
          <>
            <div className="spinner" />
            Processing Magic...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Try On Now
            <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
}

export default UploadForm;