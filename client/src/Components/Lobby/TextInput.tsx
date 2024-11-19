// Authors: Vojtech Bruza and Grace Houser
import React from "react";
import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

interface TextInputProps extends InputProps {
    id: string;
    label: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ id, label, ...props }, ref) => {
        return (
            <FormControl>
                <FormLabel htmlFor={id}>{label}</FormLabel>
                <Input ref={ref} id={id} {...props} />
            </FormControl>
        );
    }
);

TextInput.displayName = "TextInput";

export default TextInput;
