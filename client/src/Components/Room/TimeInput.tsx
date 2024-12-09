import { useState, useEffect, useRef } from "react";
import { Box, Select, HStack, Text } from "@chakra-ui/react";

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
         <HStack spacing={4}>
            <Select
               ref={minutesRef}
               value={minutes}
               onChange={handleMinutesChange}
               width="70px"
               borderColor={isError ? "red.500" : "gray.200"}
            >
               {[...Array(21).keys()].map((minute) => (
                  <option key={minute} value={minute}>
                     {minute}
                  </option>
               ))}
            </Select>

            <Text fontSize="16px" my="auto">minutes</Text>

            <Select
               ref={secondsRef}
               value={seconds}
               onChange={handleSecondsChange}
               width="70px"
               borderColor={isError ? "red.500" : "gray.200"}
            >
               {[0, 15, 30, 45].map((second) => (
                  <option key={second} value={second}>
                     {second.toString().padStart(2, "0")}
                  </option>
               ))}
            </Select>
            <Text fontSize="16px" my="auto">seconds</Text>
         </HStack>
         {isError && (
            <Text fontSize="14px" color="red.500" mt="2">
               Time cannot be zero. Please adjust.
            </Text>
         )}
      </Box>
   );
}
