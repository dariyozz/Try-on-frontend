import React from "react";
import { Download, Share2, RotateCcw } from "lucide-react";


function ResultView({ image, onDownload, onShare, onReset }) {
  return (
    <div className="result-section">
      <div className="result-header">
        <h2>✨ Your Virtual Try-On Result</h2>
        <p>Looking fantastic! Here's how you'd look in your new outfit.</p>
      </div>
      
      <div className="result-container">
        <img src={image} alt="Try-On Result" className="result-img" />
        
        <div className="result-actions">
          <button onClick={onDownload} className="action-btn download-btn">
            <Download size={18} />
            Download
          </button>
          <button onClick={onShare} className="action-btn share-btn">
            <Share2 size={18} />
            Share
          </button>
          <button onClick={onReset} className="action-btn reset-btn">
            <RotateCcw size={18} />
            Try Another
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultView;