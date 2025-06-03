import { Button, Card } from "react-bootstrap";

interface PlayerProps {
  key: number;
  image: string;
  name: string;
}

const Player: React.FC<PlayerProps> = ({key, image, name}) => {
  return (
    <Card style={{ width: '10rem' }}>
      <Card.Img variant="top" src={image} style={{ width: '48px', height: '51px', objectFit: 'cover', borderRadius: '50%', margin: 'auto', marginTop: '1rem' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {key}
        </Card.Text>
        <Button variant="primary">Profile</Button>
      </Card.Body>
    </Card>
  );
};

export default Player;