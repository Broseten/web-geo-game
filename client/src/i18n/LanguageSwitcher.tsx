import { Flex, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "./config";

export default function LocaleSwitcher() {
   const { i18n } = useTranslation();

   const handleChangeLanguage = (language: string) => {
      i18n.changeLanguage(language);
   };

   console.log(i18n.resolvedLanguage);
   
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
            {Object.entries(supportedLngs).map(([code, name]) => (
               <option value={code} key={code}>
                  {name}
               </option>
            ))}
         </Select>
      </Flex>
   );
}
