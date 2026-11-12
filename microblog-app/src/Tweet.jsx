import Card from "react-bootstrap/Card";

function Tweet({ username, tweetMessage }) {
  return (
    // border="dark" sets the border color; "border-2" makes it thicker
    // "w-100" makes it fill the full width of its container (block level), and "mb-3" adds space below.
    <Card border="dark" className="border-2 w-100 mb-3">
      <Card.Body>
        <Card.Title>@{username}</Card.Title>
        <Card.Text>{tweetMessage}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Tweet;