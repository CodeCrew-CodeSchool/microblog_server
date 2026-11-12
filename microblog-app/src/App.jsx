import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Tweet from "./Tweet"
// import './App.css'

function App() {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "http://localhost:3000/tweets";

  async function getTweets() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();

      setTweets(data);

    } catch (err) {

      console.error(err);
      setError("Could not load tweets.");

    }
  }

  useEffect(() => {

    getTweets();

  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Activity Feed</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* map() turns each tweet object into a <Tweet /> component.
          The "key" helps React keep track of which item is which;
          MongoDB's _id is perfect because it's always unique. */}
      {tweets.map((t) => (
        <Tweet key={t._id} username={t.username} tweetMessage={t.tweet} />
      ))}
    </Container>
  );
}

export default App
