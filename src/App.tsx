import { Box, Center, Heading } from '@chakra-ui/react'
import GameMap from './Components/Map/GameMap'

function App() {
  return (
    <>
      <Box className="app" backgroundColor="gray.100" h='calc(100vh)'>
        <Center>
          <Heading mb={4}>The Game</Heading>
        </Center>
        <GameMap />
      </Box>
    </>
  )
}

export default App
