import React, { useState } from 'react';
import axios from 'axios';

function ShortenForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/shorten', { originalUrl });
    setShortUrl(response.data);
  };

  console.log(shortUrl);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Shortened URL: <a href={shortUrl.originalUrl} target='_blank'>{shortUrl.shortUrl}</a>
        </p>
      )}
    </div>
  );
}

export default ShortenForm;
