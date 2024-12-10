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
         <Text className="h2" pb="0" color="brand.grey">
            {label}
         </Text>
         <NumberInput
            value={currencySymbol ? `${currencySymbol}${value}` : value}
            onChange={(_, valueString) => onChange(Number(valueString))}
            defaultValue={value} min={min} step={step}
         >
            <NumberInputField />
            <NumberInputStepper>
               <NumberIncrementStepper />
               <NumberDecrementStepper />
            </NumberInputStepper>
         </NumberInput>
      </Box>
   );
};

export default NumberInputComponent;
