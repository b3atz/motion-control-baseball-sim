import { Button } from "react-bootstrap";
import PlayerList from "../../components/player/playerList";
import "./PlayerPage.css"

function PlayerPage() {
  return (
    <div>
      <div>
        <Button variant="outline-success" className="button">Add player</Button>
        <Button variant="outline-danger" className="button"> Delete Player</Button>
      </div>
      <div className="box">
        <PlayerList />
      </div>
    </div>

  );
}

export default PlayerPage;