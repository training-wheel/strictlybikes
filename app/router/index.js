import Home from '../components/views/Home' 
import CreateGame from '../components/views/CreateGame' 
import Lobby from '../components/views/Lobby' 
import Game from '../components/views/Game' 
import Profile from '../components/views/profile/Profile' 
import Login from '../components/views/Login'
import Alert from '../components/pop-ups/Alert'

const router = { 
   Login: Login,
   Home: Home, 
   CreateGame: CreateGame,
   Lobby: Lobby,
   Game: Game,
   Profile: Profile,
   Alert: Alert,
}
export default router