import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface teams {
    id: number;
    name: string;
}

const TeamList:React.FC = () => {
    const [teams, setTeams] = useState<teams[]>([]);

    const navigate = useNavigate();

    const goToTeam = (name:string,id:number) => {
        navigate(`${name}`, {
            state: { id }
        })
    }
    useEffect(() => {
    fetch(`http://localhost:8080/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Failed to fetch Teams:", err));
  }, []);
  return (  
    <>
        <ListGroup>
            {teams.map((team) => (
                <ListGroup.Item>{team.name} <Button onClick={() => goToTeam(team.name,team.id)}>Team Page</Button> </ListGroup.Item>
            ))}
        </ListGroup>
    </>
  );
};

export default TeamList;
