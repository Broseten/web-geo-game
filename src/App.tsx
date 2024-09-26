import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import { socket } from './main'
import { useEffect, useState } from 'react';
import GameMap from './Components/Map/GameMap';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [testCounter, setTestCounter] = useState(0);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function updateCount(count: number) {
      setTestCounter(count);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('countClient', updateCount);
    socket.on('init-count-client', updateCount);

    // init the state
    socket.emit('init-count');

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('countClient', updateCount);
      socket.off('init-count-client', updateCount);
    };
  }, []);

  return (
    <>
      <Box className="app" backgroundColor="gray.100" h='calc(100vh)'>
        <Center>
          <Heading mb={4}>The Game</Heading>
        </Center>
        <Center>
          <Text>{isConnected ? "connected" : "not connected"}, {`triggered ${testCounter} times`}</Text>
          <Button onClick={() => {
            socket.emit("count");
          }}>Click me</Button>
        </Center>
        <GameMap/>
      </Box>
    </>
  )
}

export default App
