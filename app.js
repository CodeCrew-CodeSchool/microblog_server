require("dotenv").config();
 
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
 
const app = express();
const PORT = process.env.PORT || 3000;
 

app.use(express.json());
app.use(cors());
 
const client = new MongoClient(process.env.MONGO_URI);
let tweets; // will hold our collection once connected
 
// GET /tweets — return every tweet in the collection
app.get("/tweets", async (req, res) => {
  try {
    // find() returns a cursor; toArray() turns it into a normal array
    const allTweets = await tweets.find().toArray();
    res.json(allTweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch tweets" });
  }
});
 
// POST /tweets — save a new tweet from the request body
// Expected body: { "username": "myname", "tweet": "Example text body" }
app.post("/tweets", async (req, res) => {
  const { username, tweet } = req.body;
 
  if (!username || !tweet) {
    return res.status(400).json({ error: "username and tweet are required" });
  }
 
  try {
    const result = await tweets.insertOne({ username, tweet });
    res.status(201).json({ _id: result.insertedId, username, tweet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save tweet" });
  }
});
 
async function start() {
  try {
    await client.connect();
    tweets = client.db(process.env.DB_NAME || "twitterClone").collection("tweets");
    console.log("Connected to MongoDB");
 
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}
 
start();
