// Authors: Vojta Bruza and Grace Houser
// Single solution item when selected from accordian 

import { Box, Button, Image, Text, } from "@chakra-ui/react";
import { Solution } from "../../../data/DataTypes";

interface ExpandedSolutionProps {
   solution: Solution;
   onClick: () => void;
   buttonText: string;
}

const solution_image_path = "images/solution-icons/";
export const getSolutionImagePath = (name: string | undefined) =>
   !name || name === "" || name === "default" ? undefined : `${solution_image_path}${name}.png`;

export function SolutionInfoCard({ solution, onClick, buttonText, }: ExpandedSolutionProps) {
   const solImg = getSolutionImagePath(solution.image);
   return (
      <Box
         border="1px solid"
         borderColor="secondary.100"
         borderRadius="md"
         overflow="hidden"
         color="gray.900"
         backgroundColor="secondary.50"
         p={2}
         mb={4}
         width={"300px"}
      >
         <Box display="flex" alignItems="center" mb={2}>

            {/* Solution Image */}
            {
               solImg ?
                  <Image
                     height="40px"
                     width="40px"
                     mr="10px"
                     src={solImg}
                     alt={solution.name}
                  />
                  :
                  <Box
                     height="40px"
                     width="40px"
                     mr="10px"
                     backgroundColor="gray.300"
                     borderRadius="full"
                  />
            }

            {/* Solution Name and Price */}
            <Box flex="1" textAlign="left">
               <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                  {solution.name}
               </Text>
               <Text as="span" fontSize="12px" fontWeight="normal" m="0">
                  €{solution.price}
               </Text>
            </Box>
         </Box>

         {/* Solution Description */}
         <Box fontSize="12px" mb={2}>
            {solution.description}
         </Box>

         {/* Cancel Button */}
         <Button
            fontSize="14px"
            height="30px"
            width="80px"
            display="flex"
            justifySelf="flex-end"
            mt="2"
            variant={"custom_outline"}
            colorScheme="secondary.500"
            onClick={onClick}
         >
            {buttonText}
         </Button>
      </Box>
   );
}
