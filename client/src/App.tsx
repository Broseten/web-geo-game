import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useGameRoom } from './Components/Contexts/GameRoomContext';
import { useScreenSelection } from './Components/Contexts/useScreenSelection';
import HomeScreen from './Components/Home/HomeScreen';
import Lobby from './Components/Lobby/Lobby';
import Play from './Components/Play/Play';
import EndScreen from './Components/Results/EndScreen';
import Results from './Components/Results/Results';
import CreateRoom from './Components/Room/CreateRoom';
import JoinRoom from './Components/Room/JoinRoom';
import { RoomInfo } from './data/DataTypes';
import initSocket from './Hooks/useSocket';
import { LocalGameDataProvider } from './Components/Contexts/LocalGameContext';

function App() {
   const [isConnected, setIsConnected] = useState(false);
   const { currentScreen, setCurrentScreen } = useScreenSelection(); // Get the current screen from context
   const { setGameRoom } = useGameRoom();

   // TODO create and move to connection context
   initSocket('connect', () => setIsConnected(true)); // on connected
   initSocket('disconnect', () => setIsConnected(false)); // on disconnected

   // same for the facilitator (creator of the room) and for the players just directly joining
   initSocket('room-joined', (roomInfo: RoomInfo) => {
      setGameRoom(roomInfo.id, roomInfo.data);
      // not necessary since we use it only for the facilitator:
      //setMapPolygon(roomInfo.data.polygonLatLngs);
      setCurrentScreen('lobby');
      // console.log(roomInfo);
   });

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
            return <LocalGameDataProvider><Play isConnected={isConnected} /></LocalGameDataProvider>;
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
