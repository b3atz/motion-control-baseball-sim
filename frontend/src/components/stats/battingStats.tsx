import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
interface statBat {
    gameName: string;
    playerName: string;
    B1: number;
    B2: number;
    B3: number;
    HR: number;
    BB: number;
    HBP: number;
    K: number;
    AB: number;
    PA: number;
    SB: number;
    CS: number;
    SF: number;
    R: number;
    RBI: number;
    GS: boolean;
    H: number;
    BA: number;
    OBP: number;
    SLG: number;
    OPS: number;
    ISO: number;
    TB: number;
    BABIP: number;
}
interface batProps{
    id:string;
    gameTF: boolean;
}

const BattingStats:React.FC<batProps> = ({id,gameTF}) => {
    const [stats, setStats] = useState<statBat[]>([]);
    useEffect(() => {
    fetch(`http://localhost:8080/${gameTF ? 'games' : 'players'}/${id}/statBat`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch players:", err));
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
            <th>{gameTF ? 'Player' : 'Game'}</th>
            <th>B1</th>
            <th>B2</th>
            <th>B3</th>
            <th>HR</th>
            <th>BB</th>
            <th>HBP</th>
            <th>K</th>
            <th>AB</th>
            <th>PA</th>
            <th>SB</th>
            <th>CS</th>
            <th>SF</th>
            <th>R</th>
            <th>RBI</th>
            <th>GS</th>
            <th>H</th>
            <th>BA</th>
            <th>OBP</th>
            <th>SLG</th>
            <th>OPS</th>
            <th>ISO</th>
            <th>TB</th>
            <th>BABIP</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat) =>(
            <tr>
                <th>{gameTF ? stat.playerName : stat.gameName}</th>
                <th>{stat.B1}</th>
                <th>{stat.B2}</th>
                <th>{stat.B3}</th>
                <th>{stat.HR}</th>
                <th>{stat.BB}</th>
                <th>{stat.HBP}</th>
                <th>{stat.K}</th>
                <th>{stat.AB}</th>
                <th>{stat.PA}</th>
                <th>{stat.SB}</th>
                <th>{stat.CS}</th>
                <th>{stat.SF}</th>
                <th>{stat.R}</th>
                <th>{stat.RBI}</th>
                <th>{'✅'}</th>
                <th>{stat.H}</th>
                <th>{stat.BA}</th>
                <th>{stat.OBP}</th>
                <th>{stat.SLG}</th>
                <th>{stat.OPS}</th>
                <th>{stat.ISO}</th>
                <th>{stat.TB}</th>
                <th>{stat.BABIP}</th>
            </tr>
        ))}

      </tbody>
    </Table>
  );
};

export default BattingStats;
