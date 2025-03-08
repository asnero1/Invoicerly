import { useEffect, useState } from "react";
import axios from "axios";

export default function FetchData() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/") // Calls the backend API
      .then((response) => {
        setMessage(response.data);  // Stores the response in state
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  }, []);

  return (
    <div>
      <h1>API Response:</h1>
      <p>{message}</p>
    </div>
  );
}
