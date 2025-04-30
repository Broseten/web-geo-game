// Authors: Vojta Bruza 

import { Button, Text } from "@chakra-ui/react";
import { useConfig } from "./Contexts/Config";

export default function HomeButton() {
   const config = useConfig();
   return (
      <Button position="absolute" top="0" left="0"
         bg="none"
         _hover={{ background: "none" }}
         onClick={() => {
            location.reload();
         }}>
         <Text
            color="gray.900"
            _hover={{ textDecoration: "underline" }}
            textShadow='-1px -1px 8px #444444'
         >
            {config.app_name}
         </Text>
      </Button>
   );
}
