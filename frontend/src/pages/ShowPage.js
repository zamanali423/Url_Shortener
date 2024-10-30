import React, { useEffect } from "react";
import { useParams } from "react-router";

const ShowPage = () => {
  const { shortId } = useParams();

  const increaseClickCount = async () => {
    try {
      await fetch(`https://short-url-backend/short_url/count-clicks/${shortId}`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Failed to update click count:", error);
    }
  };

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await fetch(
          `https://short-url-backend/short_url/show_url_page/${shortId}`
        );

        if (!response.ok) {
          console.error("Network or server error");
          return;
        }

        const data = await response.json();
        window.location.href = data.originalUrl;
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    };

    if (shortId) {
      fetchOriginalUrl();
      increaseClickCount();
    }
  }, [shortId]);

  return <p>Redirecting to the original URL...</p>;
};

export default ShowPage;
