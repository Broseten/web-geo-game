import { Button, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { socket } from "../../main";
import GameMap from "../Map/GameMap";
import { useEffect, useState } from "react";
import initSocket from "../../Hooks/useSocket";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import Solutions from "./Solutions";

interface GameScreenProps {
   isConnected: boolean;
}

export default function GameScreen({ isConnected }: GameScreenProps) {
   const { setCurrentScreen } = useScreenSelection();
   const [testCounter, setTestCounter] = useState(0);

   // TODO - needed variables 
   const role = 'Developer'
   const playerBudget = '$200,000'
   const playerScore = 5
   const time = '5:00.00'


   const YellowLine = ({ }) => (
      <hr
         style={{
            color: "white",
            backgroundColor: "white",
            height: 5
         }}
      />
   );

   initSocket('countClient', (count: number) => setTestCounter(count));
   initSocket('init-count-client', (count: number) => setTestCounter(count));

   useEffect(() => {
      // init the state
      socket.emit('init-count');
   }, []);

   return (
      <HStack bg="brand.teal" align={"top"}>

         {/* Section left of the game map */}
         <VStack>

            {/* Branding at the top */}
            <HStack>
               {/* TODO - ideally, the home button would be a svg image */}
               {/* TODO - fix the photo, it deforms when screen size is reduced */}
               <Button bg="none" _hover={{ background: "none" }}
                  onClick={() => {
                     setCurrentScreen('home');
                  }}>
                  <Image src="/src/Theme/images/home_yellow.png" boxSize="50px"></Image>
               </Button>

               <Heading color="brand.yellow"
                  fontSize="24px"
                  padding="10px"
                  alignItems="baseline"
               >NegoDesign</Heading>
            </HStack>

            {/* TODO - supposed to be a divider line, visually */}
            <YellowLine />


            {/* Solutions Section */}
            <Heading size="xl" color="white">Solutions</Heading>

            <Text
               paddingLeft="20px"
               paddingRight="20px"
               align="center"
            >Choose a pin option below to help meet your goals as a {role}.</Text>

            {/* Solution Accordion */}
            <Solutions />


            {/* Status Section */}
            <Heading size="xl" color="white">Status</Heading>

            <Text
               paddingLeft="20px"
               paddingRight="20px"
            >Your budget is <Text as="span" fontStyle="bold">{playerBudget}</Text>.</Text>

            <Text
               paddingLeft="20px"
               paddingRight="20px" mb="40px"
            >Your score is <Text as="span" fontStyle="bold">{playerScore}</Text>.</Text>


            {/* Time Section */}
            <Heading size="xl" color="white">Time</Heading>

            <Text
               paddingLeft="20px"
               paddingRight="20px"
               fontStyle="bold"
               mb="40px"
            >{time}</Text>
         </VStack>


         {/* Adding in the Game Map */}
         <GameMap />
      </HStack>
   );
}