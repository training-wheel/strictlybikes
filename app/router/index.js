import Home from '../components/views/Home' 
import CreateGame from '../components/views/CreateGame' 
import Lobby from '../components/views/Lobby' 
import Game from '../components/views/Game' 
import Profile from '../components/views/profile/Profile' 
import Login from '../components/views/Login'
import Alert from '../components/pop-ups/Alert'
import Summary from '../components/pop-ups/Summary'
import Leaderboard from '../components/pop-ups/Leaderboard'

/**
 * Keeps reference to view locations to be exported
 * to a router
 * @name router
 *
 */
const router = {
  Login,
  Home,
  CreateGame,
  Lobby,
  Game,
  Profile,
  Alert,
  Summary,
  Leaderboard,
};
export default router;
