import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";

import GamePage from './pages/landing/GamePage';
import Home from './pages/Home';
import Layout from './components/layout/Laoyout';
import TeamPage from './pages/landing/TeamPage';
import PlayerPage from './pages/landing/PlayerPage';
import NoPage from './pages/NoPage';
import PlayerProfile from './pages/profiles/PlayerProfile';
import TeamProfile from './pages/profiles/TeamList';
import GameProfile from './pages/profiles/GameProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<TeamPage />} />
          <Route path="players" element={<PlayerPage />} />
          <Route path="games" element={<GamePage />} />
          <Route path="players/:name" element={<PlayerProfile />} />
          <Route path="teams/:name" element={<TeamProfile />} />
          <Route path="games/:name" element={<GameProfile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
