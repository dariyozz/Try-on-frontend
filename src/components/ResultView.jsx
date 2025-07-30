import React from "react";

function ResultView({ image }) {
  if (!image) return null;
  return (
    <div>
      <h2 style={{
        color: "var(--secondary)",
        fontFamily: "'Orbitron', 'Montserrat', Arial, sans-serif",
        marginTop: "2em",
        marginBottom: "1em",
        textShadow: "0 0 8px var(--secondary), 0 0 2px #fff"
      }}>Result</h2>
      <img src={image} alt="Try-On Result" className="result-img" />
    </div>
  );
}

export default ResultView;