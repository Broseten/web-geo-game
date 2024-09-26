import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import { socket } from './main'
import { useEffect, useState } from 'react';

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

    function onTestClient() {
      // must use a function -- because javscript closures
      // since the counter is a const, it captures its value when creating this callback...
      setTestCounter(testCounter => testCounter + 1);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('testClient', onTestClient);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('testClient', onTestClient);
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
            socket.emit("test");
          }}>Click me</Button>
          {/* <GameMap /> */}
        </Center>
      </Box>
    </>
  )
}

export default App
