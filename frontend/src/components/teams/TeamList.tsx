import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";

interface teams {
    id: number;
    name: string;
}

const TeamList:React.FC = () => {
    const [teams, setTeams] = useState<teams[]>([]);
    useEffect(() => {
    fetch(`http://localhost:8080/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Failed to fetch players:", err));
  }, []);
  return (  
    <>
        <ListGroup>
            {teams.map((team) => (
                <ListGroup.Item>{team.name} <Button>Team Page</Button> </ListGroup.Item>
            ))}
        </ListGroup>
    </>
  );
};

export default TeamList;
