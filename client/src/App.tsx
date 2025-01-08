import { Box } from '@chakra-ui/react';
import { LocalGameDataProvider } from './Components/Contexts/LocalGameContext';
import { useScreenSelection } from './Components/Contexts/useScreenSelection';
import HomeScreen from './Components/Home/HomeScreen';
import Lobby from './Components/Lobby/Lobby';
import Play from './Components/Play/Play';
import EndScreen from './Components/Results/EndScreen';
import MidGameResults from './Components/Results/MidGameResults';
import CreateRoom from './Components/Room/CreateRoom';
import JoinRoom from './Components/Room/JoinRoom';
import { useGameRoom } from './Components/Contexts/GameRoomContext';
import { ProgressState, RoundStage } from './data/DataTypes';

function App() {
   const { currentScreen } = useScreenSelection(); // Get the current screen from context
   const { gameRoomState } = useGameRoom();

   // Function to switch between screens
   const renderScreen = () => {
      let screenToSwitch = currentScreen;
      // override
      // TODO get rid of this override and make a smarter way to handle this with the networking now
      if (gameRoomState) {
         console.log('overriding screen due to networking');
         switch (gameRoomState.gameState) {
            case ProgressState.NotStarted:
               screenToSwitch = 'lobby';
               break;
            case ProgressState.InProgress:
               // show results only after voting finishes
               if (gameRoomState.round.stage === RoundStage.Voting &&
                  gameRoomState.round.stageProgress === ProgressState.Finished) {
                  screenToSwitch = 'results';
               }
               else screenToSwitch = 'play';
               break;
            case ProgressState.Finished:
               screenToSwitch = 'end';
               break;
            default:
               break;
         }
      }
      switch (screenToSwitch) {
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
            return <MidGameResults />;
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
         w='calc(100vw)'
         bg="primary.100"
      >
         {renderScreen()}
      </Box>
   )
}

export default App;
