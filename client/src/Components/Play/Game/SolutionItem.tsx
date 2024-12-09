import { Box, Button, Image, Text, } from "@chakra-ui/react";
import { Solution } from "../../../data/DataTypes";

interface ExpandedSolutionProps {
   solution: Solution;
   onClick: () => void;
   buttonText: string;
}

export function SolutionItem({ solution, onClick, buttonText, }: ExpandedSolutionProps) {
   return (
      <Box
         border="1px solid"
         borderColor="gray.300"
         borderRadius="md"
         overflow="hidden"
         backgroundColor="white"
         p={2}
         mb={4}
      >
         <Box display="flex" alignItems="center" mb={2}>
            <Image
               height="40px"
               width="40px"
               mr="10px"
               src={`/images/solution-icons/RED/${solution.image}.png`}
               alt={solution.name}
            />
            <Box flex="1" textAlign="left">
               <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                  {solution.name}
               </Text>
               <Text as="span" fontSize="12px" fontWeight="normal" m="0">
                  €{solution.price}
               </Text>
            </Box>
         </Box>
         <Box fontSize="12px" mb={2}>
            {solution.description}
         </Box>
         <Button
            bg="brand.red"
            color="white"
            fontSize="14px"
            height="30px"
            width="80px"
            display="flex"
            justifySelf="flex-end"
            mt="2"
            _hover={{
               borderColor: "brand.red",
               borderWidth: "2px",
               background: "red.100",
               color: "brand.red",
            }}
            onClick={onClick}
         >
            {buttonText}
         </Button>
      </Box>
   );
}
