import { useRef, useState } from 'react';
import './ImageGenerator.css';
import defaultImage from '/default-image.svg';

const API_URL = 'https://api.openai.com/v1/images/generations';

export const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('/');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef.current.value === '') {
      return 0;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        'User-Agent': 'Chrome',
      },
      body: JSON.stringify({
        prompt: inputRef.current.value, // TODO: check without brackets
        n: 1,
        size: '512x512',
      }),
    });

    const data = await response.json();
    const dataArray = data.data;

    setImageUrl(dataArray[0].url);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={imageUrl === '/' ? defaultImage : imageUrl}
            alt="Girl"
          />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You Want to See"
        />
        <div
          className="generate-btn"
          onClick={() => imageGenerator()}
        >
          Generate
        </div>
      </div>
    </div>
  );
};
