import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import BattingStats from './components/stats/battingStats';
import MCBSNav from './components/layout/navbar';
import PitchingStats from './components/stats/pitchingStats';
import FieldingStats from './components/stats/fieldingStats';

const App = () => {
  return (
    <>
      <MCBSNav></MCBSNav>
      <div className="content">
        
      </div>
    </>

  );
};

export default App;
