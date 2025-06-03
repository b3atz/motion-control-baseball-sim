import { useState, useEffect } from "react";
import Player from "./player";

interface PlayerData {
    id: number;
    name: string;
    profilePictureUrl: string;
}

const PlayerList:React.FC = () => {
    const [players, setPlayers] = useState<PlayerData[]>([]);
  useEffect(() => {
    fetch(`http://localhost:8080/players`)
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Failed to fetch players:", err));
  }, []);
  return (
    <div className="d-flex flex-wrap gap-3">
        {players.map((player) => (
            <Player key={player.id} image={player.profilePictureUrl} name={player.name} />
        ))}
    </div>
  );
};

export default PlayerList;