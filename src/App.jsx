import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultView from "./components/ResultView";
import { Camera, Upload, Sparkles, ArrowRight, RotateCcw, Download, Share2, Moon, Sun, Zap, Shield, Clock } from "lucide-react";
import LandingSection from "./components/LandingSection";

function App() {
  const [resultImg, setResultImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentView, setCurrentView] = useState('landing');
  const [theme, setTheme] = useState('dark');

  const handleThemeToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleStart = () => setCurrentView('upload');

  const handleTryOn = async (personFile, clothingFile) => {
    setLoading(true);
    setError("");
    setResultImg(null);
    setCurrentView('processing');

    const formData = new FormData();
    formData.append("person", personFile);
    formData.append("clothing", clothingFile);

    try {
      const res = await fetch("https://try-on-backend-r851.onrender.com/api/tryon", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Try-on failed. Please try again.");
      const blob = await res.blob();
      setResultImg(URL.createObjectURL(blob));
      setCurrentView('result');
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setCurrentView('upload');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResultImg(null);
    setError("");
    setCurrentView('upload');
  };

  const handleBackToLanding = () => {
    setResultImg(null);
    setError("");
    setCurrentView('landing');
  };

  const handleDownload = () => {
    if (resultImg) {
      const link = document.createElement('a');
      link.href = resultImg;
      link.download = 'virtual-tryon-result.jpg';
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share && resultImg) {
      try {
        const response = await fetch(resultImg);
        const blob = await response.blob();
        const file = new File([blob], 'virtual-tryon.jpg', { type: 'image/jpeg' });
        await navigator.share({
          title: 'My Virtual Try-On Result',
          text: 'Check out how I look in this outfit!',
          files: [file]
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`app ${theme}-theme`}>
      <style>{`
        .app {
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: all 0.3s ease;
        }

        .dark-theme {
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: #ffffff;
        }

        .light-theme {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          color: #1a202c;
        }

        .app-header {
          padding: 1rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .light-theme .app-header {
          border-bottom: 1px solid rgba(0,0,0,0.1);
          background: rgba(255,255,255,0.8);
        }

        .dark-theme .app-header {
          background: rgba(0,0,0,0.3);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .theme-toggle {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          color: inherit;
        }

        .theme-toggle:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.1);
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: calc(100vh - 140px);
        }

        .landing-section {
          text-align: center;
          padding: 2rem 0;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.8;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .feature-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 2rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .light-theme .feature-card {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.1);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .feature-icon {
          color: #6366f1;
          margin-bottom: 1rem;
        }

        .cta-button {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
        }

        .demo-steps {
          margin-top: 4rem;
          padding: 2rem;
          background: rgba(255,255,255,0.03);
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .light-theme .demo-steps {
          background: rgba(255,255,255,0.5);
          border: 1px solid rgba(0,0,0,0.1);
        }

        .steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          min-width: 120px;
        }

        .step-number {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
        }

        .step-arrow {
          font-size: 1.5rem;
          color: #6366f1;
          margin: 0 1rem;
        }

        .upload-section, .processing-section {
          max-width: 800px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .back-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: inherit;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        .upload-form {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .light-theme .upload-form {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.1);
        }

        .upload-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .upload-grid {
            grid-template-columns: 1fr;
          }
        }

        .upload-zone {
          border: 2px dashed rgba(255,255,255,0.3);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .light-theme .upload-zone {
          border: 2px dashed rgba(0,0,0,0.3);
        }

        .upload-zone:hover, .upload-zone.drag-over {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }

        .upload-placeholder h3 {
          margin: 1rem 0 0.5rem 0;
          color: #6366f1;
        }

        .upload-placeholder p {
          opacity: 0.7;
          margin-bottom: 0.5rem;
        }

        .file-types {
          font-size: 0.875rem;
          opacity: 0.5;
        }

        .preview-container {
          position: relative;
          width: 100%;
        }

        .preview-img {
          width: 100%;
          max-width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 0.5rem;
          border: 2px solid #6366f1;
        }

        .preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
        }

        .preview-container:hover .preview-overlay {
          opacity: 1;
        }

        .try-on-btn {
          width: 100%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .try-on-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
        }

        .try-on-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .processing-section {
          text-align: center;
          padding: 4rem 2rem;
        }

        .magic-circle {
          width: 120px;
          height: 120px;
          border: 3px solid rgba(99, 102, 241, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem auto;
          animation: pulse 2s infinite;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .progress-bar {
          width: 100%;
          max-width: 400px;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          margin: 2rem auto 0 auto;
          overflow: hidden;
        }

        .light-theme .progress-bar {
          background: rgba(0,0,0,0.1);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          border-radius: 2px;
          animation: progress 3s infinite;
        }

        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        .result-section {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .result-header {
          margin-bottom: 2rem;
        }

        .result-container {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .light-theme .result-container {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.1);
        }

        .result-img {
          width: 100%;
          max-width: 400px;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          margin-bottom: 2rem;
          animation: fadeInScale 0.8s ease-out;
        }

        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        .result-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .action-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: inherit;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .light-theme .action-btn {
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(0,0,0,0.2);
        }

        .action-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .download-btn:hover {
          background: linear-gradient(45deg, #10b981, #059669);
          color: white;
        }

        .share-btn:hover {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          color: white;
        }

        .reset-btn:hover {
          background: linear-gradient(45deg, #f59e0b, #d97706);
          color: white;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-top: 1rem;
          text-align: center;
        }

        .app-footer {
          text-align: center;
          padding: 2rem;
          opacity: 0.6;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .light-theme .app-footer {
          border-top: 1px solid rgba(0,0,0,0.1);
        }
      `}</style>

      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Sparkles size={24} />
            <span>TryOn.AI</span>
          </div>
          <button onClick={handleThemeToggle} className="theme-toggle">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="main-content">
        {currentView === 'landing' && (
          <LandingSection onStart={handleStart} theme={theme} />
        )}

        {currentView === 'upload' && (
          <div className="upload-section">
            <div className="section-header">
              <button onClick={handleBackToLanding} className="back-btn">
                ← Back
              </button>
              <h2>Upload Your Images</h2>
              <p>Choose a clear photo of yourself and the clothing item you want to try on.</p>
            </div>
            <UploadForm onSubmit={handleTryOn} loading={loading} setError={setError} />
            {error && <div className="error-message">⚠️ {error}</div>}
          </div>
        )}

        {currentView === 'processing' && (
          <div className="processing-section">
            <div className="processing-animation">
              <div className="magic-circle">
                <Sparkles size={48} />
              </div>
              <h2>Creating Your Virtual Try-On</h2>
              <p>Our AI is working its magic... This usually takes 10-30 seconds.</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'result' && (
          <ResultView
            image={resultImg}
            onDownload={handleDownload}
            onShare={handleShare}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} TryOn.AI • Powered by Advanced AI</p>
      </footer>
    </div>
  );
}

export default App;