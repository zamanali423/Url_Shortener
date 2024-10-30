import React, { useContext, useEffect } from "react";
import "../css/table.css";
import { urlContext } from "../context/urlContext";

const DataTable = () => {
  const { getAllUrls, setGetAllUrls } = useContext(urlContext);

  useEffect(() => {
    const fetchAllUrls = async () => {
      try {
        const url_response = await fetch("http://localhost:9000/short_url");

        if (!url_response.ok) {
          alert("Urls not found");
          return;
        }
        const urls = await url_response.json();
        setGetAllUrls(urls);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUrls();
  }, []);
  return (
    <>
      <div className="container-fluid table-container">
        <h2 className="header-title">URL Tracking Table</h2>
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle text-center">
            <thead>
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">Short ID</th>
                <th scope="col">Original URL</th>
                <th scope="col">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {getAllUrls && getAllUrls?.length > 0 ? (
                getAllUrls.map((url, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <a
                          href={`/${url.shortId}`}
                          className="text-decoration-none text-info"
                          target="_blank"
                        >
                          {url.shortId}
                        </a>
                      </td>
                      <td>{url.originalUrl}</td>
                      <td>{url.clicks}</td>
                    </tr>
                  );
                })
              ) : (
                <h5 style={{ textAlign: "center" }}>Loading...</h5>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DataTable;
