import React, { useState } from 'react';
import { BsSpotify } from "react-icons/bs";
import axios from 'axios';

function App() {
  const [url, setUrl] = useState("");

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const getTrackId = (spotifyUrl) => {
    const match = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };
  const downloadSong = async () => {
    const trackId = getTrackId(url);

    if (!trackId) {
      alert("Please enter a valid Spotify track URL.");
      return;
    }
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: trackId
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      console.log("Download Link:", response.data.data.downloadLink);
      // Open the download link in a new tab
      window.open(response.data.data.downloadLink, '_blank');
    } catch (error) {
      console.error('Download error:', error);
      alert("Download failed. Check console for more info or try again later.");
    }
  };
  return (
    <div className="h-screen w-screen bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-600 via-emerald-600 to-amber-500 flex items-center justify-center flex-col gap-y-10">
      <div className='flex items-center justify-center gap-x-2 text-xl font-bold'>
        <BsSpotify size={50} />
        <p>Spotify Song Downloader</p>
      </div>

      <div className="flex gap-2">
        <input
          type="url"
          className='h-10 w-[450px] border-none outline-none px-5 rounded-lg'
          value={url}
          onChange={handleUrl}
          placeholder="Enter Spotify song URL"
        />
        <button
          className="bg-white h-10 px-2 rounded-lg font-bold hover:bg-black hover:text-white"
          onClick={downloadSong}
        >
          Download
        </button>
      </div>
    </div>
  );
}
export default App;
