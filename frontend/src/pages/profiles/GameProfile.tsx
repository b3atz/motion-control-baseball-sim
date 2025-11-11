import { useParams, useLocation } from "react-router-dom";
import BattingStats from "../../components/stats/battingStats";
import FieldingStats from "../../components/stats/fieldingStats";
import PitchingStats from "../../components/stats/pitchingStats";

function GameProfile() {
  const { name } = useParams();
  const location = useLocation();
  const id = location.state?.id;

  return (
    <div className="profileLayout">
    <div className="w3-sidebar w3-bar-block sidebar">
      <h2>
        {name}
      </h2>
    </div>
      <div className="main-content">
        <h2>
          Batting Stats
        </h2>
        <BattingStats id={id} gameTF={true} />
        <h2>
          Pitching Stats
        </h2>
        <PitchingStats id={id} gameTF={true} />
        <h2>
          Fielding Stats
        </h2>
        <FieldingStats id={id} gameTF={true} />
      </div>
    </div>
  );
}
export default GameProfile;