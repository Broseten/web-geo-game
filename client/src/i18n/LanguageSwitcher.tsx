import { Flex, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { fetchGlobalData } from "../data/data";
import { useConfig } from "../Components/Contexts/Config";

export default function LocaleSwitcher() {
   const { i18n } = useTranslation();
   const config  = useConfig();

   const handleChangeLanguage = (language: string) => {
      i18n.changeLanguage(language);
      // reload the solutions from the server (async)
      fetchGlobalData(language, i18n);
   };

   return (
      <Flex
         position="absolute"
         top={4}
         right={4}
         align="center"
         gap={2}
         zIndex={10}
      >
         <Select
            value={i18n.language}
            onChange={(e) => handleChangeLanguage(e.target.value)}
            w="auto"
            background={"white"}
         >
            {Object.entries(config.languages).map(([code, name]) => (
               <option value={code} key={code}>
                  {name}
               </option>
            ))}
         </Select>
      </Flex>
   );
}
