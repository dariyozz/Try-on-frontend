import { Camera, Upload, Sparkles, ArrowRight, RotateCcw, Download, Share2, Moon, Sun, Zap, Shield, Clock } from "lucide-react";



function LandingSection({ onStart, theme }) {
  const features = [
    { icon: <Zap size={24} />, title: "AI-Powered", desc: "Advanced ML models for realistic try-ons" },
    { icon: <Shield size={24} />, title: "Privacy First", desc: "Your photos are processed securely" },
    { icon: <Clock size={24} />, title: "Lightning Fast", desc: "Get results in seconds, not minutes" }
  ];

  return (
    <div className="landing-section">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Try On Clothes
            <span className="gradient-text"> Virtually</span>
          </h1>
          <p className="hero-subtitle">
            Experience the future of fashion with AI-powered virtual try-ons.
            See how any outfit looks on you before you buy.
          </p>

          <div className="feature-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={onStart} className="cta-button">
            <Sparkles size={20} />
            Start Virtual Try-On
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="demo-steps">
        <h3>How It Works</h3>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <Camera size={24} />
            <span>Upload your photo</span>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <Upload size={24} />
            <span>Choose clothing</span>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <Sparkles size={24} />
            <span>See the magic!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingSection;