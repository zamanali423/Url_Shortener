import React, { useContext, useState, useEffect } from "react";
import "../css/url.css";
import { urlContext } from "../context/urlContext";

const Url = () => {
  const [url, seturl] = useState("");
  const { setGetAllUrls } = useContext(urlContext);
  const [linkAutoPut, setLinkAutoPut] = useState(false);

  // Automatically paste URL from clipboard when the switch is on
  useEffect(() => {
    const pasteFromClipboard = async () => {
      try {
        // Check if the Clipboard API is available
        if (navigator.clipboard && linkAutoPut) {
          const text = await navigator.clipboard.readText();
          seturl(text);
        }
      } catch (error) {
        console.error("Failed to read from clipboard: ", error);
      }
    };

    pasteFromClipboard();
  }, [linkAutoPut]);

  // Toggle auto-paste functionality
  const handleToggle = () => {
    setLinkAutoPut(!linkAutoPut);
  };

  // Shorten URL
  const urlShortener = async () => {
    try {
      if (!url.startsWith("https")) {
        alert("Invalid URL, please enter a valid HTTPS URL.");
        return;
      }
      const newUrl = {
        originalUrl: url,
        clicks: 0,
      };
      const url_response = await fetch(
        "https://short-url-backend/short_url/newUrl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUrl),
        }
      );
      if (!url_response.ok) {
        alert("This URL already exists. Please try another.");
        return;
      }
      const newurl = await url_response.json();
      setGetAllUrls((prevUrls) => [...prevUrls, newurl]);
      seturl("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="urlSection">
      <div className="container urlContainer">
        <h1>Short URL</h1>
        <p>Paste the URL to be shortened</p>
        <input
          type="text"
          placeholder="Enter the link here"
          className="url-input"
          value={url}
          onChange={(e) => seturl(e.target.value)}
        />
        <div className="mb-1" style={{ textAlign: "left" }}>
          <span className="information">Url auto paste from clipboard</span>
          <label className="switch ms-1">
            <input
              type="checkbox"
              checked={linkAutoPut}
              onChange={handleToggle}
            />
            <span className="slider"></span>
          </label>
        </div>
        <button className="shorten-button" onClick={urlShortener}>
          Shorten URL
        </button>
        <p className="information">
          ShortURL is a free tool to shorten URLs and generate short links.
          <br />
          <span>
            URL shortener allows creating a shortened link making it easy to
            share.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Url;
