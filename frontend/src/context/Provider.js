import React, { useState } from "react";
import { urlContext } from "./urlContext";

const Provider = ({ children }) => {
  const [getAllUrls, setGetAllUrls] = useState([]);
  return (
    <urlContext.Provider value={{ getAllUrls, setGetAllUrls }}>
      {children}
    </urlContext.Provider>
  );
};

export default Provider;
