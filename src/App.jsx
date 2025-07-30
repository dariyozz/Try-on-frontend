import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultView from "./components/ResultView";

function App() {
  const [resultImg, setResultImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0); // 0: welcome/upload, 1: processing, 2: result
  const [theme, setTheme] = useState('dark');
  const handleThemeToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleTryOn = async (personFile, clothingFile) => {
    setLoading(true);
    setError("");
    setResultImg(null);
    setStep(1); // processing
    const formData = new FormData();
    formData.append("person", personFile);
    formData.append("clothing", clothingFile);

    try {
      const res = await fetch("https://try-on-backend-r851.onrender.com/api/tryon", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Try-on failed.");
      const blob = await res.blob();
      setResultImg(URL.createObjectURL(blob));
      setStep(2); // result
    } catch (e) {
      setError(e.message || "Error occurred.");
      setStep(0); // back to upload
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResultImg(null);
    setError("");
    setStep(0);
  };

  // Step indicator text
  const stepText = [
    "1. Upload Images",
    "2. Processing...",
    "3. See Result"
  ];

  return (
    <div className={`futuristic-card ${theme}-mode`}>
      <h1>Virtual Try-On</h1>
      <p style={{marginBottom: '1.2em', color: 'var(--secondary)', fontFamily: 'Montserrat', fontSize: '1.1em'}}>
        Try on clothes virtually!<br/>
        1. Upload your photo and a clothing image.<br/>
        2. Click <b>Try On</b> and wait for the result.<br/>
        3. See yourself in new clothes instantly!
      </p>
      <div style={{marginBottom: '1em', fontWeight: 600, color: 'var(--primary)'}}>
        {step === 0 && stepText[0]}
        {step === 1 && stepText[1]}
        {step === 2 && stepText[2]}
      </div>
      {step === 0 && (
        <UploadForm onSubmit={handleTryOn} loading={loading} setError={setError} />
      )}
      {loading && <div className="loading-spinner"></div>}
      {error && <div className="error-message">{error}</div>}
      {step === 2 && (
        <>
          <ResultView image={resultImg} />
          <button className="futuristic-btn" style={{marginTop: '2em'}} onClick={handleReset}>Try Another</button>
        </>
      )}
      <div style={{marginTop: '2.5em', opacity: 0.7, fontSize: '0.95em'}}>
        <button className="futuristic-btn" style={{marginBottom: '1em', padding: '0.4em 1.2em', fontSize: '0.95em'}} onClick={handleThemeToggle} type="button">
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
        <br/>
        <span>© {new Date().getFullYear()} Virtual Try-On &bull; Powered by AI</span>
      </div>
    </div>
  );
}

export default App;