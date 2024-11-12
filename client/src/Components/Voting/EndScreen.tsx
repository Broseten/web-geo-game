import { Box, Button, Center, Heading, } from "@chakra-ui/react";
import { useScreenSelection } from "../Contexts/useScreenSelection";
import '../../Theme/home-create.css';


export default function EndScreen() {

    const { setCurrentScreen } = useScreenSelection();

    return (
        <Box overflow="auto" h="100%">
            <Center>
                <Heading mt="75px" mb="200px" size="2xl" textAlign="center"
                    color="brand.grey" textShadow='0px 0px 8px #444444'>
                    Thank you for playing Nego-Design!
                </Heading>
            </Center>

            {/* Play Again Button */}
            <Center>
                <Button //className="dark-button" 
                    mb="80px"
                    bg='brand.teal' color="white" variant='outline'
                    _hover={{ bg: "white", color: "brand.teal" }}
                    onClick={() => { setCurrentScreen('home'); }}>
                    Play Again
                </Button>
            </Center>
        </Box>
    );
}