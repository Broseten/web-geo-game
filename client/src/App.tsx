import { Box, Center, Heading } from '@chakra-ui/react'
import GameScreen from './Components/GameScreen';
import HomeScreen from './Components/HomeScreen';
import { useState } from 'react';
import initSocket from './Hooks/useSocket';
import RoomScreen from './Components/RoomScreen';
import { useScreenSelection } from './Components/Contexts/useScreenSelection';

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
         case 'room':
            return <RoomScreen />;
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
      <Box className="app" backgroundColor="gray.100" h='calc(100vh)'>
         <Center>
            <Heading mb={4}>The Game</Heading>
         </Center>
         {renderScreen()}
      </Box>
   )
}

export default App;
