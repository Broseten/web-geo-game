import { Box } from '@chakra-ui/react';
import { LocalGameDataProvider } from './Components/Contexts/LocalGameContext';
import { useScreenSelection } from './Components/Contexts/useScreenSelection';
import HomeScreen from './Components/Home/HomeScreen';
import Lobby from './Components/Lobby/Lobby';
import Play from './Components/Play/Play';
import EndScreen from './Components/Results/EndScreen';
import Results from './Components/Results/Results';
import CreateRoom from './Components/Room/CreateRoom';
import JoinRoom from './Components/Room/JoinRoom';

function App() {
   const { currentScreen } = useScreenSelection(); // Get the current screen from context

   // Function to switch between screens
   const renderScreen = () => {
      switch (currentScreen) {
         case 'home':
            return <HomeScreen />;
         case 'join':
            return <JoinRoom />;
         case 'create':
            return <CreateRoom />;
         case 'lobby':
            return <Lobby />
         case 'play':
            return <LocalGameDataProvider><Play /></LocalGameDataProvider>;
         case 'results':
            return <Results />;
         case 'end':
            return <EndScreen />;
         default:
            return <HomeScreen />;
      }
   };

   // home screen    -- for info before connecting to the socket.io server
   // room screen    -- (join/create) to configure a room, username and join
   // play screen    -- to acutally play the game (can use a parametr with id of the room to rejoin on refresh)
   return (
      <Box
         className="app"
         h='calc(100vh)'
         bg="brand.blue"
      >
         {renderScreen()}
      </Box>
   )
}

export default App;
