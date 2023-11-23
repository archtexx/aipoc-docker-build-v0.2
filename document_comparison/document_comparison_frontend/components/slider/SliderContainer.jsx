import clsx from 'clsx';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Box,
    Text,
} from '@chakra-ui/react';

const SliderContainer = ({
    min,
    step,
    max,
    title,
    sliderValue,
    onChange,
    defaultValue,
    mode
}) => {
    return (
        <Box display="flex" flexDirection="column" h={100} gap={6} pr={6}>
            <Text fontSize="lg " className={`font-medium ${mode ? 'text-white' : 'text-gray-900'}`}>
                {title}
            </Text>
            <Slider
                id={`${title}-slider`}
                aria-label={`${title}-slider`}
                onChange={(val) => onChange(val)}
                default={defaultValue}
                min={min}
                max={max}
                step={step}
                value={sliderValue}
                colorScheme="red"
            >
                <SliderMark
                    value={min}
                    mt="4"
                    fontSize="sm"
                    color={`${mode ? 'white' : 'black'}`}
                >
                    {min}
                </SliderMark>
                <SliderMark
                    value={max}
                    mt="4"
                    ml="-2"
                    fontSize="sm"
                    color={`${mode ? 'white' : 'black'}`}
                >
                    {max}
                </SliderMark>
                <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    // bg="red.500"
                    color="red.500"
                    mt="-9"
                    ml="-6"
                    w="12"
                >
                    {sliderValue}
                </SliderMark>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </Box>
    );
};

export default SliderContainer;
