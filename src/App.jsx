import { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import Spinner from './Spinner.jsx';

import defaultImage from '/default-image.svg';

import './App.scss';

const API_URL = 'https://api.openai.com/v1/images/generations';

function App() {
  const [imageUrl, setImageUrl] = useState('/');
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  // const resetRef = () => {
  //   inputRef.current.value = '';
  // };

  const fetchData = async () => {
    return await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        'User-Agent': 'Chrome',
      },
      body: JSON.stringify({
        prompt: inputRef.current.value,
        n: 1,
        size: '512x512',
      }),
    });
  };

  const imageGenerator = async () => {
    if (inputRef.current.value === '') {
      return 0;
    }

    setLoading(true);

    const response = await fetchData();
    const data = await response.json();
    const dataArray = data.data;
    const image = dataArray[0].url;

    setTimeout(() => {
      setImageUrl(image);
      // resetRef();
      setLoading(false);
    }, 0);
  };

  const handleImageDownload = () => {
    if (imageUrl === '/') {
      return 0;
    }

    saveAs(imageUrl, 'image.png');
  };

  return (
    <div className="app container">
      <div className="header">
        <span className="header--main">AI Image</span>
        <span className="header--accent">Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img
            src={imageUrl === '/' ? defaultImage : imageUrl}
            alt="Girl"
          />
        </div>
        <div className="spinner">{loading && <Spinner />}</div>
      </div>
      <form
        className="search-box"
        action="#"
      >
        <input
          required
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You Want to See"
        />
        <div className="btns">
          <input
            className="btn"
            type="submit"
            value="Generate"
            onClick={() => imageGenerator()}
          />
          <input
            className="btn btn--download"
            type="button"
            value="Download"
            onClick={handleImageDownload}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
