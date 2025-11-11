import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
interface statPitch {
    gameName: string;
    playerName: string;
    pos: string,
    E:  number,  
    PO: number,
    A:  number,
}
interface pitProps{
    id:string;
    gameTF: boolean;
}

const FieldingStats:React.FC<pitProps> = ({id, gameTF}) => {
    const [stats, setStats] = useState<statPitch[]>([]);
    useEffect(() => {
    fetch(`http://localhost:8080/${gameTF ? 'games' : 'players'}/${id}/statField`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
            <th>{gameTF ? 'Player' : 'Game'}</th>
            <th>Position</th>
            <th>E</th>
            <th>PO</th>
            <th>A</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat) =>(
            <tr>
                <th>{gameTF ? stat.playerName : stat.gameName}</th>
                <th>{stat.pos}</th>
                <th>{stat.E}</th>
                <th>{stat.PO}</th>
                <th>{stat.A}</th>
            </tr>
        ))}

      </tbody>
    </Table>
  );
};

export default FieldingStats;
