import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Games {
    id: number;
    innings:number;
    home: {
        id: number;
        name: string;
    };
    away: {
        id: number;
        name: string;
    };
}

const GameList:React.FC = () => {
    const navigate = useNavigate();

    const goToGame = (name:string,id:number) => {
        navigate(`${name}`, {
            state: { id }
        })
    }
    const [Games, setGames] = useState<Games[]>([]);
    useEffect(() => {
    fetch(`http://localhost:8080/games`)
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Failed to fetch Games:", err));
  }, []);
  return (  
    <>
        <ListGroup>
            {Games.map((game) => (
                <ListGroup.Item>{game.home.name} VS {game.away.name} <Button onClick={() => goToGame(`${game.home.name} VS ${game.away.name} `, game.id)}>Game Page</Button> </ListGroup.Item>
            ))}
        </ListGroup>
    </>
  );
};

export default GameList;
