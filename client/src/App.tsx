import { Box, Center, Heading } from '@chakra-ui/react'
import GameScreen from './Components/GameScreen';
import HomeScreen from './Components/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import initSocket from './Hooks/useSocket';

function App() {
   const [isConnected, setIsConnected] = useState(false);

   initSocket('connect', () => setIsConnected(true)); // on connected
   initSocket('disconnect', () => setIsConnected(false)); // on disconnected

   // TODO use grid for the layout somewhere?

   // TODO three different pages? home + join/create + play
   // home screen          -- for info before connecting to the socket.io server
   // join/create screen   -- (can be two separate) to configure a room, username and join
   // play screen          -- to acutally play the game (can use a parametr with id of the room to rejoin on refresh)
   //                      -- can redirect back to the join screen when insufficient info is provided (missing username)
   return (
      <Router>
         <Box className="app" backgroundColor="gray.100" h='calc(100vh)'>
            <Center>
               <Heading mb={4}>The Game</Heading>
            </Center>
            <Routes>
               <Route path="/" element={<HomeScreen />} />
               <Route path="/play" element={<GameScreen isConnected={isConnected} />} />
            </Routes>
         </Box>
      </Router>
   )
}

export default App;
