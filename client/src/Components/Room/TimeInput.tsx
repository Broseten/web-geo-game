import { Box, HStack, Select, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface TimeInputProps {
   initialMinutes: number;
   initialSeconds: number;
   onChange: (seconds: number) => void;
}

export default function TimeInput({ initialMinutes, initialSeconds, onChange }: TimeInputProps) {
   const [minutes, setMinutes] = useState(initialMinutes);
   const [seconds, setSeconds] = useState(initialSeconds);
   const [isError, setIsError] = useState(false);

   // Refs for the select elements to be able to remove focus
   const minutesRef = useRef<HTMLSelectElement>(null);
   const secondsRef = useRef<HTMLSelectElement>(null);

   useEffect(() => {
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
   }, [initialMinutes, initialSeconds]);

   const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newMinutes = parseInt(event.target.value);
      setMinutes(newMinutes);
      const totalSeconds = newMinutes * 60 + seconds;
      setIsError(totalSeconds === 0);
      onChange(totalSeconds);

      // Remove focus if error
      if (totalSeconds === 0) {
         minutesRef.current?.blur();
         secondsRef.current?.blur();
      }
   };

   const handleSecondsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSeconds = parseInt(event.target.value);
      setSeconds(newSeconds);
      const totalSeconds = minutes * 60 + newSeconds;
      setIsError(totalSeconds === 0);
      onChange(totalSeconds);

      // Remove focus if error
      if (totalSeconds === 0) {
         minutesRef.current?.blur();
         secondsRef.current?.blur();
      }
   };

   return (
      <Box>
         <HStack spacing={2} mt="0.5">
            <Select
               ref={minutesRef}
               value={minutes}
               onChange={handleMinutesChange}
               width="70px"
               borderColor={isError ? "red.500" : "gray.300"}
               _hover={{ borderColor: "grey.300" }}
               color="gray.900"
            >
               {[...Array(21).keys()].map((minute) => (
                  <option key={minute} value={minute}>
                     {minute}
                  </option>
               ))}
            </Select>

            <Text fontSize="16px" color="gray.900" my="auto" mr="15px">minutes</Text>

            <Select
               ref={secondsRef}
               value={seconds}
               onChange={handleSecondsChange}
               width="70px"
               borderColor={isError ? "red.500" : "gray.300"}
               _hover={{ borderColor: "grey.300" }}
               color="gray.900"
            >
               {[0, 15, 30, 45].map((second) => (
                  <option key={second} value={second}>
                     {second.toString().padStart(2, "0")}
                  </option>
               ))}
            </Select>
            <Text fontSize="16px" color="gray.900" my="auto">seconds</Text>
         </HStack>
         {isError && (
            <Text fontSize="14px" color="red.500" mt="2">
               Time cannot be zero. Please adjust.
            </Text>
         )}
      </Box>
   );
}
