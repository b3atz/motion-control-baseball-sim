import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import PlayerList from './components/player/playerList';
import BattingStats from './components/stats/battingStats';
import MCBSNav from './components/layout/navbar';
import PitchingStats from './components/stats/pitchingStats';
import FieldingStats from './components/stats/fieldingStats';

const App = () => {
  return (
    <div className="content">
      <MCBSNav></MCBSNav>
      <BattingStats id='2' gameTF={false}></BattingStats>
      <PitchingStats id='1' gameTF={true}></PitchingStats>
      <FieldingStats id='1' gameTF={true}></FieldingStats>
    </div>
  );
};

export default App;
