import { Box } from '@chakra-ui/react'
import GameScreen from './Components/Game/GameScreen';
import HomeScreen from './Components/Home/HomeScreen';
import { useState } from 'react';
import initSocket from './Hooks/useSocket';
import { useScreenSelection } from './Components/Contexts/useScreenSelection';
import JoinRoom from './Components/Room/JoinRoom';
import CreateRoom from './Components/Room/CreateRoom';
import Lobby from './Components/Room/Lobby';
import CustomizeRoom from './Components/Room/CustomizeRoom';

function App() {
   const [isConnected, setIsConnected] = useState(false);

   initSocket('connect', () => setIsConnected(true)); // on connected
   initSocket('disconnect', () => setIsConnected(false)); // on disconnected

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
         case 'customize':
            return <CustomizeRoom />;
         case 'lobby':
            return <Lobby />
         case 'play':
            return <GameScreen isConnected={isConnected} />;
         default:
            return <HomeScreen />;
      }
   };

   // TODO use grid for the layout somewhere?

   // TODO three different pages? home + join/create + play
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
