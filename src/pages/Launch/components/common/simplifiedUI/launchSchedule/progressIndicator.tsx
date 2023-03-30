import {Grid, Box, Flex, Text, GridItem, useColorMode} from '@chakra-ui/react';
import React from 'react';

type ProgressIndicatorProps = {
  launchSteps: string[];
  currentStep: number;
  maxStep: number;
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = (props) => {
  const {launchSteps, currentStep, maxStep} = props;
  const {colorMode} = useColorMode();

  return (
    <Flex ml={'28px'}>
      {launchSteps.map((step: string, index: number) => {
        const indexNum = index + 1;
        const isStep = currentStep === indexNum;
        const pastStep = currentStep > indexNum || maxStep > indexNum;

        const getLineWidth = () => {
          switch (step) {
            case 'Snapshot': {
              return '84px';
            }

            case 'Whitelist': {
              return '105px';
            }

            case 'Public Sale 1': {
              return '106px';
            }

            case 'Public Sale 2': {
              return '99px';
            }

            case 'Unlock 1': {
              return '98px';
            }

            case 'Unlock ..': {
              return '98px';
            }

            case 'Unlock 49': {
              return '0px';
            }
            default:
              return '0px';
          }
        };

        return (
          <Flex alignItems="center" textAlign={'center'}>
            {/* Dot */}
            <Box
              borderRadius={18}
              bg={isStep ? '#2ea1f8' : 'transparent'}
              w={'8px'}
              h={'8px'}
              alignItems="center"
              justifyContent="center"
              border={
                isStep
                  ? ''
                  : colorMode === 'light'
                  ? 'solid 1px #e6eaee'
                  : 'solid 1px #373737'
              }></Box>
            {/* Line */}
            {index < 6 && {step} && (
              <Box
                w={getLineWidth()}
                h={'2px'}
                bg={isStep ? '#2ea1f8' : 'transparent'}
                border={
                  isStep
                    ? ''
                    : colorMode === 'light'
                    ? 'solid 1px #e6eaee'
                    : 'solid 1px #373737'
                }></Box>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};
