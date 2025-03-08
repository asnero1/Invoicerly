import FetchData from "./fetch"; // Import the FetchData component

export default function Home() {
  return (
    <div>
      <h1>Welcome to Invoicerly Frontend!</h1>
      <FetchData />  {/* Fetches and displays API data */}
    </div>
  );
}
