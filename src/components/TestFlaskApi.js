import React, { useEffect, useState } from "react";

const TestFlaskAPI = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/test") // Make sure this URL is correct!
      .then((res) => res.json())
      .then((data) => {
        console.log("Flask API Response:", data); // Debugging
        setMessage(data.message);
      })
      .catch((error) => console.error("Error fetching Flask API:", error));
  }, []);

  return (
    <div>
      <h2>Flask API Test</h2>
      <p>Flask API Response: {message || "Loading..."}</p>
    </div>
  );
};

export default TestFlaskAPI;