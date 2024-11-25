// Authors: Vojta Bruza and Grace Houser
// Number slider for getting value for room set up

import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, VStack, Tooltip } from "@chakra-ui/react";
import '../../Theme/theme.css';
import React from "react";

interface NumSliderProps {
  value: number;  // Value to control the slider from parent component
  onChange: (value: number) => void;  // Callback function to update the value in the parent component
  min?: number;  // Optional min value, default is 0
  max?: number;  // Optional max value, default is 100
}

const NumSlider: React.FC<NumSliderProps> = ({ value, onChange, min, max }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Box>
      <Slider
        value={value}  // Controlled value
        onChange={onChange}  // Update value on change
        min={min}  // Minimum value
        max={max}  // Maximum value
        step={30}
        colorScheme="teal"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>

        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${value}`}  // Tooltip will show the current value
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
};

export default NumSlider;
