import { useParams, useLocation } from "react-router-dom";
import "./profile.css"
import { useState, useEffect } from "react";
import BattingStats from "../../components/stats/battingStats";
import PitchingStats from "../../components/stats/pitchingStats";
import FieldingStats from "../../components/stats/fieldingStats";

interface PlayerData {
    id: number;
    name: string;
    profilePictureUrl: string;
}

function PlayerProfile() {
  const { name } = useParams();
  const location = useLocation();
  const id = location.state?.id;
  const [player, setPlayers] = useState<PlayerData>();
  useEffect(() => {
    fetch(`http://localhost:8080/player/${id}`)
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Failed to fetch players:", err));
  }, []);
  return (
    <div className="profileLayout">
    <div className="w3-sidebar w3-bar-block sidebar">
      <img src={player?.profilePictureUrl}/>
      <h2>
        {name}
      </h2>
    </div>
      <div className="main-content">
        <h2>
          Batting Stats
        </h2>
        <BattingStats id={id} gameTF={false} />
        <h2>
          Pitching Stats
        </h2>
        <PitchingStats id={id} gameTF={false} />
        <h2>
          Fielding Stats
        </h2>
        <FieldingStats id={id} gameTF={false} />
      </div>
    </div>
  );
}
export default PlayerProfile;