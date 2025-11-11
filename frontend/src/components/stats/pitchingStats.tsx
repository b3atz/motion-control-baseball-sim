import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
interface statPitch {
    gameName: string;
    playerName: string;
    IP: number;
    H: number;
    BB: number,
    K: number,
    HR: number,
    ER: number,
    BF: number,
    HB: number,
    GS: boolean,
    ERA: number,
    WHIP: number,
    K_per_9: number,
    BB_per_9: number,
    HR_per_9: number,
    OBA: number,
}
interface pitProps{
    id:string;
    gameTF: boolean;
}

const PitchingStats:React.FC<pitProps> = ({id, gameTF}) => {
    const [stats, setStats] = useState<statPitch[]>([]);
    useEffect(() => {
    fetch(`http://localhost:8080/${gameTF ? 'games' : 'players'}/${id}/statPitch`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
            <th>{gameTF ? 'Player' : 'Game'}</th>
            <th>IP</th>
            <th>H</th>
            <th>BB</th>
            <th>K</th>
            <th>HR</th>
            <th>ER</th>
            <th>BF</th>
            <th>GS</th>
            <th>ERA</th>
            <th>WHIP</th>
            <th>K_per_9</th>
            <th>BB_per_9</th>
            <th>HR_per_9</th>
            <th>OBA</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat) =>(
            <tr>
                <th>{gameTF ? stat.playerName : stat.gameName}</th>
                <th>{stat.IP}</th>
                <th>{stat.H}</th>
                <th>{stat.BB}</th>
                <th>{stat.K}</th>
                <th>{stat.HR}</th>
                <th>{stat.ER}</th>
                <th>{stat.BF}</th>
                <th>{stat.GS ? '✅' : '⛔'}</th>
                <th>{stat.ERA}</th>
                <th>{stat.WHIP}</th>
                <th>{stat.K_per_9}</th>
                <th>{stat.BB_per_9}</th>
                <th>{stat.HR_per_9}</th>
                <th>{stat.OBA}</th>
            </tr>
        ))}

      </tbody>
    </Table>
  );
};

export default PitchingStats;
