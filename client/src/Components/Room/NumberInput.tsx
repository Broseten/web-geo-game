import { Box, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";

interface NumberInputComponentProps {
   value: number;
   onChange: (value: number) => void;
   label: string;
   min?: number;
   step?: number;
   currencySymbol?: string;
}

const NumberInputComponent = ({ value, onChange, label, min = 1, step = 1, currencySymbol, }: NumberInputComponentProps) => {
   return (
      <Box pb="20px">
         <Text className="h2" pb="0" color="gray.900">
            {label}
         </Text>
         <NumberInput
            value={currencySymbol ? `${currencySymbol}${value}` : value}
            onChange={(_, valueString) => onChange(Number(valueString))}
            defaultValue={value} min={min} step={step}
         >
            <NumberInputField color="gray.900" borderColor="gray.300" _hover={{ borderWidth: "1px" }} mt="0.5"/>
            <NumberInputStepper borderColor="gray.300" borderTop="20">
               <NumberIncrementStepper bgColor="gray.100" borderColor="gray.300" color="gray.400" />
               <NumberDecrementStepper bgColor="gray.100" borderColor="gray.300" color="gray.400" />
            </NumberInputStepper>
         </NumberInput>
      </Box>
   );
};

export default NumberInputComponent;
