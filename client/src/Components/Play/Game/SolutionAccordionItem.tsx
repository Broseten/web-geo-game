import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Image, Text, } from "@chakra-ui/react";
import { Solution } from "../../../data/DataTypes";

interface SolutionAccordionProps {
   solution: Solution;
   onClick: () => void;
   buttonText: string;
}

export function SolutionAccordionItem({ solution, onClick, buttonText, }: SolutionAccordionProps) {
   return (
      <AccordionItem>
         <h2>
            <AccordionButton p="2">
               <Image
                  height="40px"
                  width="40px"
                  ml="0"
                  mr="10px"
                  src={`/images/solution-icons/RED/${solution.image}.png`}
               />
               <Box flex="1" textAlign="left">
                  <Text lineHeight="1.15" fontSize="14px" fontWeight="bold">
                     {solution.name}
                  </Text>
                  <Text as="span" fontSize="12px" fontWeight="normal" m="0">
                     €{solution.price}
                  </Text>
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4} fontSize="12px">
            {solution.description}
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
         </AccordionPanel>
      </AccordionItem>
   );
}
