import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
        { inputs: inputText },
        {
          headers: {
            Authorization: `Bearer ${"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"}`,
          },
          responseType: 'blob',
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setImageURL(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputText) {
      generateImage();
    } else {
      setImageURL('');
    }
  }, [inputText]);

  const clearImage = () => {
    setInputText('');
    setImageURL('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#fff', boxShadow: '0 0 10px black', borderRadius: '8px', padding: '40px', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Image Generation App</h1>
        <form>
          <input
            type="text"
            placeholder="Enter text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={generateImage}
              style={{ backgroundColor: '#3498db', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              disabled={loading}
            >
              Generate Image
            </button>
            <button
              type="button"
              onClick={clearImage}
              style={{ backgroundColor: '#ecf0f1', color: '#333', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Clear
            </button>
          </div>
        </form>

        {loading && <p style={{ textAlign: 'center', marginTop: '1rem', color: '#3498db' }}>Loading...</p>}
        {error && <p style={{ color: '#e74c3c', marginTop: '1rem' }}>{error}</p>}

        {imageURL && (
          <div style={{ marginTop: '1rem' }}>
            <img src={imageURL} alt="Generated" style={{ width: '100%' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
