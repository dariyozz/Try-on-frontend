import React, { useRef, useState } from "react";

function UploadForm({ onSubmit, loading, setError }) {
  const personRef = useRef();
  const clothingRef = useRef();
  const [personPreview, setPersonPreview] = useState(null);
  const [clothingPreview, setClothingPreview] = useState(null);

  // Max file size: 5MB
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

  const handlePersonChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file, "Your photo")) {
      setPersonPreview(URL.createObjectURL(file));
      setError && setError("");
    } else {
      setPersonPreview(null);
      personRef.current.value = "";
    }
  };
  const handleClothingChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file, "Clothing image")) {
      setClothingPreview(URL.createObjectURL(file));
      setError && setError("");
    } else {
      setClothingPreview(null);
      clothingRef.current.value = "";
    }
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

  // Clear previews if reset (when both refs are empty)
  React.useEffect(() => {
    if (!personRef.current?.files[0]) setPersonPreview(null);
    if (!clothingRef.current?.files[0]) setClothingPreview(null);
  }, [loading]);

  return (
    <form onSubmit={handleSubmit}>
      <label className="upload-label">
        Upload Your Photo
        <input
          type="file"
          accept="image/*"
          ref={personRef}
          onChange={handlePersonChange}
          disabled={loading}
          required
        />
      </label>
      {personPreview && (
        <div>
          <img src={personPreview} alt="Person Preview" className="preview-img" />
        </div>
      )}
      <label className="upload-label">
        Upload Clothing Image
        <input
          type="file"
          accept="image/*"
          ref={clothingRef}
          onChange={handleClothingChange}
          disabled={loading}
          required
        />
      </label>
      {clothingPreview && (
        <div>
          <img src={clothingPreview} alt="Clothing Preview" className="preview-img" />
        </div>
      )}
      <button type="submit" className="futuristic-btn" disabled={loading}>
        {loading ? "Processing..." : "Try On"}
      </button>
    </form>
  );
}

export default UploadForm;