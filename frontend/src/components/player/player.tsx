import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface PlayerProps {
  id: number;
  image: string;
  name: string;
}

const Player: React.FC<PlayerProps> = ({ id, image, name}) => {
  const navigate = useNavigate();

  const goToPlayer = () => {
    navigate(`${name}`, {
      state: { id }
    })
  }
  return (
    <Card style={{ width: '10rem' }}>
      <Card.Img alt={name + ' image'} variant="top" src={image} style={{ width: '48px', height: '51px', objectFit: 'cover', borderRadius: '50%', margin: 'auto', marginTop: '1rem' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {id}
        </Card.Text>
        <Button onClick={goToPlayer} variant="primary">Profile</Button>
      </Card.Body>
    </Card>
  );
};

export default Player;